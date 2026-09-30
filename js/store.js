// إدارة حالة المتجر والسلة والمفضلة (State Management & LocalStorage)
// متجر الأحذية الفاخرة - FIS Group

const Store = {
    CART_KEY: 'fis_shoes_cart_v2',
    WISHLIST_KEY: 'fis_shoes_wishlist_v2',
    COUPON_KEY: 'fis_shoes_applied_coupon',

    // قراءة السلة من التخزين المحلي
    getCart() {
        try {
            const data = localStorage.getItem(this.CART_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error reading cart from localStorage', e);
            return [];
        }
    },

    // حفظ السلة
    saveCart(cart) {
        try {
            localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
            this.updateBadges();
            this.renderCartDrawer();
        } catch (e) {
            console.error('Error saving cart', e);
        }
    },

    // قراءة المفضلة
    getWishlist() {
        try {
            const data = localStorage.getItem(this.WISHLIST_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    },

    // حفظ المفضلة
    saveWishlist(list) {
        try {
            localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(list));
            this.updateBadges();
        } catch (e) {}
    },

    // إضافة منتج إلى السلة
    addToCart(productId, size = 42, quantity = 1) {
        const product = PRODUCTS.find(p => p.id === Number(productId));
        if (!product) return false;

        const cart = this.getCart();
        const existingIndex = cart.findIndex(item => item.id === product.id && item.size === Number(size));

        if (existingIndex > -1) {
            cart[existingIndex].quantity += Number(quantity);
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                titleAr: product.titleAr,
                price: product.price,
                image: product.image,
                material: product.material,
                size: Number(size),
                quantity: Number(quantity)
            });
        }

        this.saveCart(cart);
        this.showToast('تمت الإضافة بنجاح', `تمت إضافة "${product.titleAr}" (مقاس ${size}) إلى سلة مشترياتك`, 'success');
        this.openCartDrawer();
        return true;
    },

    // حذف منتج من السلة
    removeFromCart(productId, size) {
        let cart = this.getCart();
        const removed = cart.find(item => item.id === Number(productId) && item.size === Number(size));
        cart = cart.filter(item => !(item.id === Number(productId) && item.size === Number(size)));
        this.saveCart(cart);
        if (removed) {
            this.showToast('تم الحذف', `تم حذف "${removed.titleAr}" من السلة`, 'info');
        }
    },

    // تعديل الكمية (+ أو -)
    updateQuantity(productId, size, change) {
        const cart = this.getCart();
        const item = cart.find(i => i.id === Number(productId) && i.size === Number(size));
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            this.removeFromCart(productId, size);
            return;
        }

        this.saveCart(cart);
    },

    // إفراغ السلة
    clearCart() {
        localStorage.removeItem(this.CART_KEY);
        localStorage.removeItem(this.COUPON_KEY);
        this.updateBadges();
        this.renderCartDrawer();
    },

    // قراءة الكوبون الحالي
    getAppliedCoupon() {
        try {
            const data = localStorage.getItem(this.COUPON_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    },

    // تطبيق كوبون خصم
    applyCoupon(code) {
        const cleanCode = (code || '').trim().toUpperCase();
        if (COUPONS[cleanCode]) {
            const coupon = {
                code: cleanCode,
                ...COUPONS[cleanCode]
            };
            localStorage.setItem(this.COUPON_KEY, JSON.stringify(coupon));
            this.showToast('تم تفعيل الكوبون!', `مبروك! حصلت على خصم ${coupon.discountPercent}% كود (${cleanCode})`, 'success');
            this.renderCartDrawer();
            if (typeof renderCartPage === 'function') renderCartPage();
            return { success: true, coupon };
        } else {
            this.showToast('كوبون غير صالح', 'كود الخصم غير موجود أو منتهي الصلاحية، جرب كود FIS2026', 'warning');
            return { success: false, message: 'كود غير صالح' };
        }
    },

    // إزالة الكوبون
    removeCoupon() {
        localStorage.removeItem(this.COUPON_KEY);
        this.showToast('تم إلغاء الكوبون', 'تمت إزالة كود الخصم من السلة', 'info');
        this.renderCartDrawer();
        if (typeof renderCartPage === 'function') renderCartPage();
    },

    // حساب المجاميع المالية
    calculateTotals() {
        const cart = this.getCart();
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const coupon = this.getAppliedCoupon();
        
        let discount = 0;
        if (coupon && subtotal > 0) {
            discount = Math.round((subtotal * coupon.discountPercent) / 100);
        }

        // شحن مجاني للطلبات أكثر من 500 جنيه، وإلا 35 جنيه
        let shipping = 0;
        if (subtotal > 0) {
            shipping = subtotal >= 500 ? 0 : 35;
        }

        const total = Math.max(0, subtotal - discount + shipping);

        return {
            subtotal,
            discount,
            shipping,
            total,
            coupon,
            itemsCount: cart.reduce((count, item) => count + item.quantity, 0)
        };
    },

    // تبديل حالة المفضلة
    toggleWishlist(productId) {
        const id = Number(productId);
        let list = this.getWishlist();
        const exists = list.includes(id);

        if (exists) {
            list = list.filter(item => item !== id);
            this.showToast('المفضلة', 'تمت الإزالة من قائمة رغباتك', 'info');
        } else {
            list.push(id);
            const p = PRODUCTS.find(prod => prod.id === id);
            this.showToast('أضيف للمفضلة ❤️', `تمت إضافة "${p ? p.titleAr : 'المنتج'}" إلى قائمة رغباتك`, 'success');
        }

        this.saveWishlist(list);
        this.updateWishlistIcons();
        return !exists;
    },

    isInWishlist(productId) {
        return this.getWishlist().includes(Number(productId));
    },

    // تحديث أعداد الشارات في شريط التنقل
    updateBadges() {
        const totals = this.calculateTotals();
        const cartBadges = document.querySelectorAll('.cart-count-badge');
        cartBadges.forEach(badge => {
            badge.textContent = totals.itemsCount;
            badge.style.display = totals.itemsCount > 0 ? 'inline-flex' : 'none';
        });

        const wishlist = this.getWishlist();
        const wishBadges = document.querySelectorAll('.wishlist-count-badge');
        wishBadges.forEach(badge => {
            badge.textContent = wishlist.length;
            badge.style.display = wishlist.length > 0 ? 'inline-flex' : 'none';
        });
    },

    // تحديث أيقونات القلوب في كروت المنتجات
    updateWishlistIcons() {
        const list = this.getWishlist();
        document.querySelectorAll('.btn-wishlist').forEach(btn => {
            const id = Number(btn.getAttribute('data-id'));
            if (list.includes(id)) {
                btn.classList.add('active');
                btn.setAttribute('title', 'إزالة من المفضلة');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('title', 'إضافة للمفضلة');
            }
        });
    },

    // عرض إشعار عائم Toast احترافي
    showToast(title, message, type = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const icons = {
            success: '✓',
            warning: '⚠',
            info: 'ℹ',
            error: '✕'
        };

        const toast = document.createElement('div');
        toast.className = `toast-item toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || '★'}</div>
            <div class="toast-content">
                <h4 class="toast-title">${title}</h4>
                <p class="toast-message">${message}</p>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
        `;

        container.appendChild(toast);

        // إزالة تلقائية بعد 3.5 ثوانٍ
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                if (toast.parentElement) toast.remove();
            }, 300);
        }, 3500);
    },

    // فتح السلة الجانبية
    openCartDrawer() {
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.getElementById('drawer-overlay');
        if (drawer && overlay) {
            this.renderCartDrawer();
            drawer.classList.add('open');
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    },

    // إغلاق السلة الجانبية
    closeCartDrawer() {
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.getElementById('drawer-overlay');
        if (drawer && overlay) {
            drawer.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    },

    // رسم السلة الجانبية
    renderCartDrawer() {
        const container = document.getElementById('drawer-items-list');
        const footer = document.getElementById('drawer-footer');
        if (!container || !footer) return;

        const cart = this.getCart();
        const totals = this.calculateTotals();

        if (cart.length === 0) {
            container.innerHTML = `
                <div class="empty-cart-view">
                    <div class="empty-cart-icon">🛒</div>
                    <h3>سلة مشترياتك فارغة!</h3>
                    <p>استكشف تشكيلتنا الفاخرة من الأحذية الجلدية الطبيعية وأضف ما يعجبك.</p>
                    <a href="products.html" class="btn btn-primary" onclick="Store.closeCartDrawer()">تصفح المنتجات الآن</a>
                </div>
            `;
            footer.style.display = 'none';
            return;
        }

        footer.style.display = 'block';

        let html = '';
        cart.forEach(item => {
            html += `
                <div class="drawer-item">
                    <img src="${item.image}" alt="${item.titleAr}" class="drawer-item-img">
                    <div class="drawer-item-info">
                        <h4 class="drawer-item-title">${item.titleAr}</h4>
                        <div class="drawer-item-meta">
                            <span class="badge-size">المقاس: ${item.size}</span>
                            <span class="item-price">${item.price} ج.م</span>
                        </div>
                        <div class="drawer-item-actions">
                            <div class="qty-control">
                                <button type="button" class="btn-qty" onclick="Store.updateQuantity(${item.id}, ${item.size}, -1)">-</button>
                                <span class="qty-num">${item.quantity}</span>
                                <button type="button" class="btn-qty" onclick="Store.updateQuantity(${item.id}, ${item.size}, 1)">+</button>
                            </div>
                            <button type="button" class="btn-remove" onclick="Store.removeFromCart(${item.id}, ${item.size})" title="حذف">
                                🗑️ حذف
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;

        // تحديث الفوتر
        const discountRow = totals.discount > 0 ? `
            <div class="summary-row discount">
                <span>خصم الكوبون (${totals.coupon.code}):</span>
                <span>-${totals.discount} ج.م</span>
            </div>
        ` : '';

        const shippingText = totals.shipping === 0 ? '<span class="free-shipping">مجاني 🎉</span>' : `${totals.shipping} ج.م`;

        footer.innerHTML = `
            <div class="drawer-summary">
                <div class="summary-row">
                    <span>المجموع الفرعي:</span>
                    <span>${totals.subtotal} ج.م</span>
                </div>
                ${discountRow}
                <div class="summary-row">
                    <span>الشحن:</span>
                    <span>${shippingText}</span>
                </div>
                <div class="summary-row total">
                    <span>الإجمالي النهائي:</span>
                    <span class="final-price">${totals.total} ج.م</span>
                </div>
            </div>
            <div class="drawer-buttons">
                <a href="cart.html" class="btn btn-secondary w-100" onclick="Store.closeCartDrawer()">عرض وتعديل السلة الكاملة</a>
                <a href="cart.html#checkout" class="btn btn-primary w-100 mt-2" onclick="Store.closeCartDrawer()">إتمام الشراء والدفع الآن ⚡</a>
            </div>
        `;
    }
};

// تشغيل التحديث التلقائي للشارات عند جاهزية الصفحة
document.addEventListener('DOMContentLoaded', () => {
    Store.updateBadges();
    Store.updateWishlistIcons();
});

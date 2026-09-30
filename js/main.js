// الوظائف العامة وتفاعلات الواجهة (UI Interactions & Components)
// متجر الأحذية الفاخرة - FIS Group

// 1. مولد بطاقة المنتج الموحدة (Reusable Product Card Generator)
function createProductCardHTML(product) {
    const isFav = Store.isInWishlist(product.id);
    const badgeColors = {
        hot: 'badge-danger',
        featured: 'badge-gold',
        new: 'badge-emerald',
        top: 'badge-primary',
        luxury: 'badge-purple',
        exclusive: 'badge-dark'
    };
    const badgeClass = badgeColors[product.badgeType] || 'badge-primary';

    // حساب نسبة الخصم
    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
            <div class="product-badge-group">
                <span class="product-badge ${badgeClass}">${product.badge}</span>
                <span class="product-badge badge-discount">-${discountPercent}%</span>
            </div>

            <button class="btn-wishlist ${isFav ? 'active' : ''}" data-id="${product.id}" onclick="Store.toggleWishlist(${product.id})" title="${isFav ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>

            <div class="product-media" onclick="openQuickView(${product.id})">
                <img src="${product.image}" alt="${product.titleAr}" class="product-img" loading="lazy">
                <div class="product-quick-overlay">
                    <span class="btn-quick-view">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        معاينة سريعة
                    </span>
                </div>
            </div>

            <div class="product-body">
                <div class="product-category-tag">${product.material}</div>
                <h3 class="product-title" onclick="openQuickView(${product.id})">${product.titleAr}</h3>
                <p class="product-subtitle">${product.title}</p>
                
                <div class="product-rating">
                    <div class="stars">★★★★★</div>
                    <span class="rating-val">${product.rating}</span>
                    <span class="rating-count">(${product.reviewsCount})</span>
                </div>

                <div class="product-price-row">
                    <div class="prices">
                        <span class="current-price">${product.price} <small>ج.م</small></span>
                        <span class="old-price">${product.originalPrice} ج.م</span>
                    </div>
                </div>

                <div class="product-sizes-picker">
                    <span class="size-label">المقاس:</span>
                    <div class="size-chips" id="sizes-chips-${product.id}">
                        ${product.sizes.map((s, idx) => `
                            <button type="button" class="size-chip ${idx === 1 ? 'selected' : ''}" onclick="selectSizeForCard(${product.id}, ${s}, this)">${s}</button>
                        `).join('')}
                    </div>
                </div>

                <div class="product-actions-btn">
                    <button class="btn-add-cart" onclick="addCardProductToCart(${product.id})">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        إضافة إلى السلة
                    </button>
                </div>
            </div>
        </div>
    `;
}

// تتبع المقاس المختار لكل بطاقة
const selectedSizesMap = {};

function selectSizeForCard(productId, size, btn) {
    selectedSizesMap[productId] = size;
    const parent = btn.parentElement;
    parent.querySelectorAll('.size-chip').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

function addCardProductToCart(productId) {
    const p = PRODUCTS.find(prod => prod.id === productId);
    const size = selectedSizesMap[productId] || (p && p.sizes[1]) || (p && p.sizes[0]) || 42;
    Store.addToCart(productId, size, 1);
}

// 2. نافذة المعاينة السريعة (Quick View Modal)
function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let modal = document.getElementById('quick-view-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quick-view-modal';
        modal.className = 'modal-backdrop';
        document.body.appendChild(modal);
    }

    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    modal.innerHTML = `
        <div class="modal-dialog quick-view-dialog">
            <button class="modal-close-btn" onclick="closeQuickView()">&times;</button>
            <div class="quick-view-content">
                <div class="quick-view-gallery">
                    <div class="main-img-box">
                        <img src="${product.image}" id="qv-main-img" alt="${product.titleAr}">
                    </div>
                    <div class="thumbnails-row">
                        <img src="${product.image}" class="thumb-img active" onclick="switchQvImg('${product.image}', this)">
                        ${product.featuredImg !== product.image ? `<img src="${product.featuredImg}" class="thumb-img" onclick="switchQvImg('${product.featuredImg}', this)">` : ''}
                    </div>
                </div>

                <div class="quick-view-details">
                    <div class="qv-header">
                        <span class="qv-tag">${product.material}</span>
                        <h2 class="qv-title">${product.titleAr}</h2>
                        <p class="qv-subtitle">${product.title}</p>
                    </div>

                    <div class="qv-rating">
                        <div class="stars">★★★★★</div>
                        <span>${product.rating}</span>
                        <span class="reviews-count">(${product.reviewsCount} تقييم حقيقي)</span>
                    </div>

                    <div class="qv-pricing">
                        <span class="qv-price">${product.price} <small>ج.م</small></span>
                        <span class="qv-old-price">${product.originalPrice} ج.م</span>
                        <span class="qv-discount-pill">وفر ${discountPercent}%</span>
                    </div>

                    <p class="qv-desc">${product.description}</p>

                    <div class="qv-features">
                        <h4>مميزات الحذاء:</h4>
                        <ul>
                            ${product.features.map(f => `<li>✓ ${f}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="qv-size-section">
                        <div class="size-header">
                            <span>اختر المقاس المناسب:</span>
                            <a href="#size-guide" class="size-guide-link" onclick="showSizeGuideAlert(event)">📏 دليل المقاسات</a>
                        </div>
                        <div class="qv-size-selector" id="qv-sizes">
                            ${product.sizes.map((s, i) => `
                                <label class="size-radio-label">
                                    <input type="radio" name="qv-size" value="${s}" ${i === 1 ? 'checked' : ''}>
                                    <span class="size-box">${s}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="qv-purchase-row">
                        <div class="qv-qty">
                            <button type="button" class="btn-qty" onclick="changeQvQty(-1)">-</button>
                            <input type="number" id="qv-qty-input" value="1" min="1" max="10" readonly>
                            <button type="button" class="btn-qty" onclick="changeQvQty(1)">+</button>
                        </div>
                        <button class="btn btn-primary btn-add-qv" onclick="confirmAddToCartFromQv(${product.id})">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            إضافة إلى السلة الآن
                        </button>
                    </div>

                    <div class="qv-guarantees">
                        <div class="guarantee-item">
                            <span>🚚</span> توصيل سريع خلال 24-48 ساعة
                        </div>
                        <div class="guarantee-item">
                            <span>🔄</span> استبدال واسترجاع مجاني خلال 14 يوماً
                        </div>
                        <div class="guarantee-item">
                            <span>🛡️</span> ضمان جودة الجلد الطبيعي 100%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // إغلاق عند النقر بالخلفية
    modal.onclick = (e) => {
        if (e.target === modal) closeQuickView();
    };
}

function switchQvImg(src, thumb) {
    const mainImg = document.getElementById('qv-main-img');
    if (mainImg) mainImg.src = src;
    document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

function changeQvQty(delta) {
    const input = document.getElementById('qv-qty-input');
    if (!input) return;
    let val = parseInt(input.value, 10) + delta;
    if (val < 1) val = 1;
    if (val > 10) val = 10;
    input.value = val;
}

function confirmAddToCartFromQv(productId) {
    const sizeInput = document.querySelector('input[name="qv-size"]:checked');
    const size = sizeInput ? parseInt(sizeInput.value, 10) : 42;
    const qtyInput = document.getElementById('qv-qty-input');
    const qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;

    Store.addToCart(productId, size, qty);
    closeQuickView();
}

function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function showSizeGuideAlert(e) {
    if (e) e.preventDefault();
    Store.showToast('دليل المقاسات', 'المقاسات مطابقة للمعايير الأوروبية (EU Standard). إذا كنت بين مقاسين، ننصح باختيار المقاس الأكبر.', 'info');
}

// 3. التحكم في الوضع الليلي/النهاري (Dark / Light Theme)
function initTheme() {
    const savedTheme = localStorage.getItem('fis_theme') || 'dark'; // الوضع الليلي الفاخر افتراضياً
    applyTheme(savedTheme);

    const toggles = document.querySelectorAll('.btn-theme-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('fis_theme', newTheme);
            Store.showToast('المظهر', `تم التحويل إلى ${newTheme === 'dark' ? 'الوضع الليلي الفاخر 🌙' : 'الوضع النهاري المضيء ☀️'}`, 'info');
        });
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icons = document.querySelectorAll('.theme-icon');
    icons.forEach(icon => {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
}

// 4. القائمة المتنقلة للشاشات الصغيرة (Mobile Navigation Drawer)
function initMobileNav() {
    const hamburger = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-links');
    const overlay = document.getElementById('nav-overlay');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
            if (overlay) overlay.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', navMenu.classList.contains('mobile-open'));
        });

        if (overlay) {
            overlay.addEventListener('click', () => {
                navMenu.classList.remove('mobile-open');
                overlay.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        }
    }
}

// 5. زر الصعود للأعلى (Back To Top Button)
function initBackToTop() {
    const btn = document.getElementById('btn-back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 6. المشتركين في النشرة البريدية (Newsletter)
function handleNewsletter(e) {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    if (!input || !input.value) return;

    Store.showToast('شكراً لاشتراكك!', `تم تسجيل بريدك (${input.value}) للاستفادة من أحدث العروض وكوبونات الخصم الحصرية.`, 'success');
    input.value = '';
}

// تهيئة جميع العناصر عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initBackToTop();

    // ربط أزرار فتح السلة
    document.querySelectorAll('.btn-cart-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            Store.openCartDrawer();
        });
    });

    // ربط إغلاق السلة عند النقر على الخلفية
    const overlay = document.getElementById('drawer-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            Store.closeCartDrawer();
        });
    }

    // زر الإغلاق داخل السلة الجانبية
    const closeBtn = document.getElementById('btn-close-drawer');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            Store.closeCartDrawer();
        });
    }

    // ربط نموذج النشرة البريدية
    const newsForm = document.querySelector('.newsletter-form');
    if (newsForm) {
        newsForm.addEventListener('submit', handleNewsletter);
    }
});

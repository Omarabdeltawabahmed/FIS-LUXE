// كود التوافقية لملف v.js مع النظام البرمجي الحديث للمتجر
// Shoes Store - FIS Group

document.addEventListener('DOMContentLoaded', function() {
    // دعم التنقل السلس إذا وجد
    const enterButton = document.getElementById('enterButton');
    if (enterButton) {
        enterButton.addEventListener('click', function(e) {
            // يتم التوجيه إلى المنتجات بسلاسة
        });
    }

    // دعم أزرار الشراء القديمة إن وجدت في أي صفحة
    const legacyAddButtons = document.querySelectorAll('.add-to-cart:not(.btn-add-cart)');
    legacyAddButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            if (typeof Store !== 'undefined') {
                const prodId = index + 1;
                Store.addToCart(prodId, 42, 1);
            }
        });
    });
});

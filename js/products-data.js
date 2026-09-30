// قائمة المنتجات الرسمية لمتجر الأحذية الفاخرة (Shoes Store - FIS)
// مطابقة للمنتجات الأصلية بدقة مع تحسين التفاصيل والخيارات

const PRODUCTS = [
    {
        id: 1,
        title: "Wingtip Oxfords - Black",
        titleAr: "حذاء وينج تيب أوكسفورد - أسود ملكي",
        category: "oxford",
        material: "جلد طبيعي فاخر 100% (Genuine Leather)",
        price: 200,
        originalPrice: 320,
        rating: 4.9,
        reviewsCount: 48,
        image: "./img/s1.jpg",
        featuredImg: "./img/s11.jpg",
        badge: "الأكثر مبيعاً",
        badgeType: "hot",
        description: "حذاء أوكسفورد كلاسيكي مصنوع يدوياً من جلد العجل الطبيعي الفاخر بتشطيب لامع، بنقوش وينج تيب الكلاسيكية البريطانية ونعل مقوى يمنحك راحة وثقة في المناسبات الرسمية والعملية.",
        features: [
            "جلد طبيعي 100% عالي المتانة ومقاوم للتشقق",
            "نعل داخلي طبي مبطن بتقنية Memory Foam لراحة تدوم طوال اليوم",
            "تصميم وينج تيب Wingtip Brogue بريطاني أصيل",
            "أربطة كلاسيكية من القطن المعالج المقاوم للتمزق"
        ],
        sizes: [40, 41, 42, 43, 44, 45],
        colors: [
            { name: "أسود ملكي", hex: "#111111" }
        ],
        inStock: true
    },
    {
        id: 2,
        title: "Wingtip Oxfords - Brown",
        titleAr: "حذاء وينج تيب أوكسفورد - بني كلاسيك",
        category: "oxford",
        material: "جلد طبيعي فاخر 100% (Genuine Leather)",
        price: 200,
        originalPrice: 290,
        rating: 4.8,
        reviewsCount: 36,
        image: "./img/s2.jpg",
        featuredImg: "./img/s1.jpg",
        badge: "مميز",
        badgeType: "featured",
        description: "تصميم وينج تيب عريق بلون بني كلاسيكي دافئ، يمنحك إطلالة فريدة تناسب البدلات الكحلية والرمادية. مصمم بنعل مضاد للانزلاق ودرزات يدوية محكمة.",
        features: [
            "جلد طبيعي محبب معالج بمواد طبيعية للحفاظ على بريقه",
            "نعل مطاطي عالي التحمل ضد التآكل والانزلاق",
            "بطانة داخلية جيدة التهوية تمنع الرطوبة والروائح",
            "تشطيب يدوي إيطالي أنيق"
        ],
        sizes: [40, 41, 42, 43, 44],
        colors: [
            { name: "بني كلاسيكي", hex: "#633B1E" }
        ],
        inStock: true
    },
    {
        id: 3,
        title: "Cap Toe Oxfords - Grey",
        titleAr: "حذاء كاب تو أوكسفورد - رمادي عصري",
        category: "oxford",
        material: "جلد طبيعي فاخر 100% (Genuine Leather)",
        price: 300,
        originalPrice: 420,
        rating: 4.9,
        reviewsCount: 29,
        image: "./img/s3.jpg",
        featuredImg: "./img/s12.jpg",
        badge: "جديد",
        badgeType: "new",
        description: "حذاء أوكسفورد بتصميم كاب تو (Cap Toe) راقٍ بلون رمادي نادر وجذاب. خيار استثنائي لعشاق التميز والأناقة العصرية في الاجتماعات الهامة والأفراح.",
        features: [
            "جلد طبيعي فاخر بلون رمادي فاحم أنيق",
            "تصميم رأس الحذاء Cap Toe يمنح القدم رشاقة وطولاً متناسقاً",
            "نعل مرن خفيف الوزن يسهل الحركة والمشي الطويل",
            "كعب متين ممتص للصدمات بارتفاع قياسي مريح"
        ],
        sizes: [41, 42, 43, 44, 45],
        colors: [
            { name: "رمادي معدني", hex: "#5C616B" }
        ],
        inStock: true
    },
    {
        id: 4,
        title: "Cap Toe Oxfords - Havan",
        titleAr: "حذاء كاب تو أوكسفورد - هافان إيطالي",
        category: "oxford",
        material: "جلد طبيعي فاخر 100% (Genuine Leather)",
        price: 300,
        originalPrice: 440,
        rating: 5.0,
        reviewsCount: 54,
        image: "./img/s4.jpg",
        featuredImg: "./img/s4.jpg",
        badge: "أعلى تقييماً",
        badgeType: "top",
        description: "لون هافان إيطالي كلاسيكي معتق يدوياً، يعكس الفخامة الصريحة ويضفي طابعاً أرستقراطياً على مظهرك في أي مناسبة ترتديه فيها.",
        features: [
            "جلد طبيعي إيطالي معتق يدوياً بتدرج لوني ساحر",
            "نعل مريح مع طبقة مضادة لامتصاص الرطوبة",
            "خياطة غرز دقيقة ومعززة لتحمل الاستخدام اليومي",
            "تصميم انسيابي يمنح أقصى درجات الراحة لأصابع القدم"
        ],
        sizes: [40, 41, 42, 43, 44, 45],
        colors: [
            { name: "هافان إيطالي", hex: "#8B4513" }
        ],
        inStock: true
    },
    {
        id: 5,
        title: "Plain Toe Derby - Navy",
        titleAr: "حذاء ديربي بلين تو - كحلي شمواه",
        category: "derby",
        material: "جلد شمواه طبيعي فاخر (Suede)",
        price: 450,
        originalPrice: 590,
        rating: 4.8,
        reviewsCount: 31,
        image: "./img/s5.jpg",
        featuredImg: "./img/s13.jpg",
        badge: "شمواه فاخر",
        badgeType: "luxury",
        description: "حذاء ديربي بتصميم بلين تو ناعم من جلد الشمواه السويدي عالي الجودة بلون كحلي ملكي، يجمع بين البساطة الهادئة والراحة الرياضية الفاخرة.",
        features: [
            "جلد شمواه سويدي طبيعي فائق النعومة ومقاوم للغبار",
            "نظام رباط ديربي مفتوح يسهل ارتداء الحذاء ويوفر مرونة لمشط القدم",
            "نعل من الكاوتشوك الطبيعي المرن لتخفيف إجهاد الساقين",
            "مثالي للإطلالات الذكية (Smart Casual) والبدلات الصيفية"
        ],
        sizes: [40, 41, 42, 43, 44],
        colors: [
            { name: "كحلي داكن", hex: "#1A2E40" }
        ],
        inStock: true
    },
    {
        id: 6,
        title: "Plain Toe Derby - Blue",
        titleAr: "حذاء ديربي بلين تو - أزرق عصري",
        category: "derby",
        material: "جلد شمواه طبيعي فاخر (Suede)",
        price: 450,
        originalPrice: 580,
        rating: 4.7,
        reviewsCount: 22,
        image: "./img/s6.jpg",
        featuredImg: "./img/s6.jpg",
        badge: "إصدار حصري",
        badgeType: "exclusive",
        description: "حذاء ديربي بلون أزرق بحري مع لمسات لونية هافان على النعل، يعكس الحيوية والأناقة المعاصرة للشباب والرجال الباحثين عن إطلالة لا تتكرر.",
        features: [
            "جلد شمواه فاخر تم انتقاؤه بعناية ودقة",
            "نعل مزدوج بلون جذاب يمنح ثباتاً وراحة مضاعفة",
            "تصميم ديربي مريح مناسب لأصحاب الأقدام العريضة",
            "درزات زخرفية بارزة تعكس الحرفية اليدوية الراقية"
        ],
        sizes: [41, 42, 43, 44, 45],
        colors: [
            { name: "أزرق بحري", hex: "#2B547E" }
        ],
        inStock: true
    }
];

// فريق العمل والمطورين الرسميين للمشروع (FIS Group)
const TEAM_MEMBERS = [
    {
        id: "tawfeek",
        name: "Tawfeek Rabia Tawfeek",
        nameAr: "توفيق ربيع توفيق",
        faculty: "Faculty of Computers and Artificial Intelligence",
        facultyAr: "كلية الحاسبات والذكاء الاصطناعي",
        job: "Full Stack Developer & Architecture",
        jobAr: "مطور برمجيات متكامل وهيكلة نظم",
        age: 19,
        image: "./img/387746122_1955293314851796_1932364966814651002_n.jpg",
        bio: "مطور برمجيات شغوف بهندسة تجارب الويب المتطورة، تخصص في بناء منطق المتاجر الإلكترونية وإدارة البيانات والتدفقات البرمجية الذكية.",
        skills: ["Frontend Logic", "State Architecture", "JavaScript ES6+", "Performance Tuning"],
        social: {
            facebook: "https://www.facebook.com",
            whatsapp: "https://wa.me/201000000000",
            tiktok: "https://www.tiktok.com",
            github: "https://github.com"
        }
    },
    {
        id: "omar",
        name: "Omar Abdeltawab Ahmed",
        nameAr: "عمر عبد التواب أحمد",
        faculty: "Faculty of Computers and Artificial Intelligence",
        facultyAr: "كلية الحاسبات والذكاء الاصطناعي",
        job: "UI/UX & Frontend Engineer Lead",
        jobAr: "مهندس واجهات وتجربة المستخدم وتصميم رقمي",
        age: 19,
        image: "./img/289078761_136583772325810_8293142301591594756_n.jpg",
        bio: "خبير في تصميم واجهات المستخدم والتفاعل البصري الفاخر، مهتم بتحويل الأفكار إلى منتجات رقمية مبهرة وسريعة الاستجابة لجميع الشاشات.",
        skills: ["UI/UX Design", "Modern CSS & Flexbox/Grid", "Responsive Layouts", "Micro-Interactions"],
        social: {
            facebook: "https://www.facebook.com",
            whatsapp: "https://wa.me/201000000000",
            tiktok: "https://www.tiktok.com",
            github: "https://github.com"
        }
    },
    {
        id: "soliman",
        name: "Soliman Mohamed Abdelhalim",
        nameAr: "سليمان محمد عبد الحليم",
        faculty: "Faculty of Computers and Artificial Intelligence",
        facultyAr: "كلية الحاسبات والذكاء الاصطناعي",
        job: "Frontend Developer & Quality Assurance",
        jobAr: "مطور واجهات أمامية واختبار جودة البرمجيات",
        age: 20,
        image: "./img/images.jpeg",
        bio: "مطور واجهات تفاعلية يركز على تكامل المكونات واختبار سلاسة تجربة المستخدم وضمان التوافق التام مع مختلف المتصفحات والأجهزة.",
        skills: ["Component Integration", "DOM Architecture", "Cross-Browser QA", "Product Flow Optimization"],
        social: {
            facebook: "https://www.facebook.com",
            whatsapp: "https://wa.me/201000000000",
            tiktok: "https://www.tiktok.com",
            github: "https://github.com"
        }
    }
];

// تصنيفات المنتجات
const CATEGORIES = [
    { id: "all", nameAr: "جميع الأحذية", count: 6 },
    { id: "oxford", nameAr: "أوكسفورد كلاسيك (Oxfords)", count: 4 },
    { id: "derby", nameAr: "ديربي مودرن (Derby)", count: 2 },
    { id: "leather", nameAr: "جلد طبيعي (Genuine Leather)", count: 4 },
    { id: "suede", nameAr: "شمواه فاخر (Suede)", count: 2 }
];

// أكواد الخصم الترويجية
const COUPONS = {
    "FIS2026": { discountPercent: 15, description: "خصم حصري 15% لمشروع FIS 2026" },
    "WELCOME10": { discountPercent: 10, description: "خصم ترحيبي 10% للعملاء الجدد" },
    "STUDENT": { discountPercent: 20, description: "خصم طلاب كلية الحاسبات 20%" }
};

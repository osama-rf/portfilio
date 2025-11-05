import type { SiteConfig, SiteContent, Translations } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Your Tech Partner for Turning Ideas into Success",
  author: "Osama AlRefay",
  description:
    "Saudi-based software engineer turning ideas into real-world apps. I focus on performance, clean UI, and smart integrations.",
  lang: "en",
  navLinks: [
    { text: "Projects", href: "#projects" },
    { text: "About", href: "#about" },
  ],
  socialLinks: [
    { text: "LinkedIn", href: "https://linkedin.com/in/osama-alrefay" },
    { text: "Github", href: "https://github.com/osama-rf" },
  ],
  socialImage: "/osama-og.png",
  canonicalURL: "https://osama-portfolio.vercel.app",
};

export const TRANSLATIONS: Translations = {
  en: {
    nav: {
      projects: "Our Projects",
      about: "About Us",
      featuredProjects: "Our Projects",
      aboutMe: "About Us",
      testimonials: "Testimonials",
    },
    ui: {
      email: "Email",
      preview: "Preview",
      source: "Source",
      switchLang: "العربية",
      whatsapp: "Let's Chat on WhatsApp",
      ctaMain: "Ready to Build Your Success? 🚀",
      ctaSubtitle: "Let's Turn Your Idea Into Reality",
      techPartners: "Tech Partners",
      heroCTAPrimary: "Let's Build Your App",
      heroCTASecondary: "View Our Work",
      statProjects: "Projects Delivered",
      statSatisfaction: "Client Satisfaction",
      statSupport: "Support Available",
      statPrice: "SAR Starting Price",
      trustDelivery: "On-Time Delivery",
      trustQuality: "Quality Guaranteed",
      trustSupport: "24/7 Support",
    },
    pricing: {
      title: "How Much to Get Started?",
      mvpText: "MVP (Minimum Viable Product) starts from",
      priceAmount: "2849",
      priceCurrency: "SAR",
      note: "Final price depends on the scope of your idea and required features",
      ctaText: "Send Your Idea & Get Custom Quote",
    },
    hero: {
      name: "osama-labs",
      specialty: "Your Tech Partner for Turning Ideas into Success",
      summary:
        "We help entrepreneurs and businesses turn ideas into mobile and web apps that actually work and scale.",
      email: "youremail@example.com",
    },
    projects: [
      {
        name: "Maliha app",
        summary:
          "A comprehensive beauty booking platform connecting clients with professional makeup artists. Features real-time availability, secure payments, portfolio showcases, and seamless appointment management. Built with scalability in mind to handle thousands of bookings.",
        linkPreview: "https://maliha.me",
        image: "/maliha.png",
      },
      {
        name: "Kedan",
        summary:
          "Your strategic partner for empowering third sector organizations. A comprehensive business communication platform designed specifically for non-profit organizations, featuring streamlined workflows, stakeholder management, and collaborative tools to enhance organizational impact.",
        linkPreview: "https://new.kidanm.com.sa/",
        image: "/kedan-logo.svg",
      },
      {
        name: "Glowpick",
        summary:
          "AI-powered skincare analysis app with e-commerce integration.",
        linkPreview: "https://apps.apple.com/sa/app/glowpick/id6737756143",
        image: "/glowpick.png",
      },
      {
        name: "Thmanyah",
        summary:
          "Modern podcast web application built for Thmanyah media company, featuring responsive design and Arabic content optimization.",
        linkPreview:
          "https://thamanyah-assignment.vercel.app/?podcast=%D8%AB%D9%85%D8%A7%D9%86%D9%8A%D8%A5",
        image: "/Thmanyah-Icon-tab.svg",
      },
      // {
      //   name: "Scan Me GPT",
      //   summary:
      //     "Free customizable QR code generator with advanced styling options, color themes, and instant download capabilities.",
      //   linkPreview: "https://scan-me-gpt.vercel.app/ar",
      //   image: "/scanme.svg",
      // },
      {
        name: "Zaai AI",
        summary:
          "AI solutions for businesses, offering analytics, automation, and smart recommendations.",
        linkPreview: "https://zaai.vercel.app/ar",
        image: "/zaai-og.png",
      },
      {
        name: "Dream International Schools",
        summary:
          "Website for Dream International Schools, providing services for students and parents, showcasing the school and its facilities.",
        linkPreview: "https://dis-sa.vercel.app/ar",
        image: "/dis.png",
      },
    ],
    about: {
      description: `
        We're a Saudi software team that loves building apps that make life easier.
        From e-commerce to AI-powered platforms, we focus on clean UI, high performance, and scalability.
        Co-founders of Mutfarid, builders of Glowpick and Zaai AI.
      `,
      image: "/osama.webp",
    },
    testimonials: [
      {
        content: "Working with Osama was a game-changer for our business. He transformed our idea into a fully functional platform that our makeup artists and clients love. The booking system is smooth, the interface is elegant, and everything runs without technical issues. Highly recommend!",
        platform: "Maliha",
      },
      {
        content: "Osama understood the unique needs of our third sector organization and delivered a communication platform that truly empowers our teams. The workflow management and stakeholder collaboration tools have streamlined our operations significantly. His expertise in building scalable solutions made a real difference in our organizational impact.",
        platform: "Kedan",
      },
      {
        content: "Osama delivered beyond our expectations. The AI integration was complex, but he made it work seamlessly with our e-commerce platform. His attention to detail and commitment to performance optimization made our app stand out in the market. A true professional!",
        platform: "Glowpick",
      },
      {
        content: "Osama built us a fast, reliable platform that showcases our facilities beautifully and handles all our communication needs. The project was delivered on time and within budget. Professional, responsive, and delivered exactly what we needed!",
        platform: "Dream International Schools",
      },
    ],
  },
  ar: {
    nav: {
      projects: "مشاريعنا",
      about: "عنّا",
      featuredProjects: "مشاريعنا",
      aboutMe: "عنّا",
      testimonials: "آراء العملاء",
    },
    ui: {
      email: "الإيميل",
      preview: "معاينة",
      source: "الكود",
      switchLang: "English",
      whatsapp: "يلا نتواصل على الواتس",
      ctaMain: " جاهز نبني نجاحك؟" + " 🚀",
      ctaSubtitle: "يلا نحول فكرتك لواقع",
      techPartners: "تقنياتنا",
      heroCTAPrimary: "يلا نبني تطبيقك",
      heroCTASecondary: "شاهد أعمالنا",
      statProjects: "مشروع منجز",
      statSatisfaction: "رضا العملاء",
      statSupport: "دعم متوفر",
      statPrice: "ريال سعر البداية",
      trustDelivery: "تسليم في الوقت المحدد",
      trustQuality: "جودة مضمونة",
      trustSupport: "دعم 24/7",
    },
    pricing: {
      title: "محتاج موقع أو تطبيق احترافي لمشروعك؟",
      mvpText: "النسخة الأولية (MVP) تبدأ من",
      priceAmount: "2849",
      priceCurrency: "ريال",
      note: "السعر النهائي يعتمد على حجم الفكرة والمزايا المطلوبة",
      ctaText: "أرسل فكرتك وخذ عرض سعر مخصص",
    },
    hero: {
      name: "osama-labs",
      specialty: "شريكك التقني في تحويل افكارك لنجاحات",
      summary:
        "نساعد رواد الأعمال والشركات يحولون أفكارهم لتطبيقات ويب وجوال تشتغل وتكبر معهم.",
      email: "youremail@example.com",
    },
    projects: [
      {
        name: "منصة مليحة",
        summary: "منصة متكاملة لحجز مواعيد خبيرات التجميل، توصل العملاء بخبيرات المكياج المحترفات. المنصة فيها نظام حجز لحظي، دفع آمن، معرض أعمال لكل خبيرة، وإدارة سهلة للمواعيد. مبنية بتقنيات حديثة عشان تتحمل آلاف الحجوزات بدون أي مشاكل.",
        linkPreview: "https://maliha.me",
        image: "/maliha.png",
      },
      {
        name: "كدان",
        summary: "شريكك الاستراتيجي لتمكين مؤسسات القطاع الثالث. منصة تواصل أعمال متكاملة مصممة خصيصاً للمؤسسات غير الربحية، فيها إدارة سير العمل، إدارة أصحاب المصلحة، وأدوات تعاونية تعزز أثر المؤسسة وتسهل التواصل بين الفرق.",
        linkPreview: "https://new.kidanm.com.sa/",
        image: "/kedan-logo.svg",
      },
      {
        name: "Glowpick",
        summary: "تطبيق ذكاء اصطناعي لتحليل البشرة مع متجر إلكتروني.",
        linkPreview: "https://apps.apple.com/sa/app/glowpick/id6737756143",
        image: "/glowpick.png",
      },
      {
        name: "ثمانية",
        summary:
          "تطبيق ويب حديث للبودكاست مبني لشركة ثمانية الإعلامية، يتميز بالتصميم التجاوبي وتحسين المحتوى العربي.",
        linkPreview:
          "https://thamanyah-assignment.vercel.app/?podcast=%D8%AB%D9%85%D8%A7%D9%86%D9%8A%D8%A9",
        image: "/Thmanyah-Icon-tab.svg",
      },
      // {
      //   name: "scanMe",
      //   summary:
      //     "مولد رموز QR مجاني قابل للتخصيص مع خيارات تصميم متقدمة وسمات ألوان وإمكانية تحميل فوري.",
      //   linkPreview: "https://scan-me-gpt.vercel.app/ar",
      //   image: "/scanme.svg",
      // },
      {
        name: "Zaai AI",
        summary: "حلول ذكاء اصطناعي للأعمال تشمل التحليلات والأتمتة والتوصيات.",
        linkPreview: "zaai.vercel.app",
        image: "/zaai-ai.png",
      },
      {
        name: "مدارس دريم العالمية",
        summary:
          "موقع مدارس دريم العالمية، يقدم خدمات للطلاب وأولياء الأمور. ويستعرض المدرسة ومرافقها.",
        linkPreview: "https://dis-sa.vercel.app/ar",
        image: "/dis.png",
      },
    ],
    about: {
      description: `
        هلا! أنا أسامة، مهندس برمجيات سعودي أحب أحول الأفكار لمنتجات تشتغل وتنجح.
        من المتاجر الإلكترونية لمنصات الذكاء الاصطناعي، تركيزي دايم على الواجهة النظيفة والأداء العالي
      `,
      image: "/osama.webp",
    },
    testimonials: [
      {
        content: "التعاون مع أسامة كان نقلة نوعية لمشروعنا. حول فكرتنا لمنصة متكاملة، خبيرات المكياج والعملاء عندنا يحبونها. نظام الحجز سلس، التصميم راقي، وكل شي يشتغل بدون مشاكل تقنية. صراحة أنصح فيه بقوة!",
        platform: "مليحة",
      },
      {
        content: "أسامة فهم احتياجات مؤسستنا في القطاع الثالث وسلّمنا منصة تواصل تمكّن فرقنا بشكل حقيقي. أدوات إدارة سير العمل والتعاون مع أصحاب المصلحة سهّلت علينا العمليات بشكل كبير. خبرته في بناء حلول قابلة للتوسع خلت فرق واضح في أثر مؤسستنا.",
        platform: "كدان",
      },
      {
        content: "أسامة سلّم المشروع فوق التوقعات. دمج الذكاء الاصطناعي كان معقد، لكن خلاه يشتغل بكل سلاسة مع المتجر الإلكتروني. اهتمامه بالتفاصيل وتحسين الأداء خلى التطبيق يبرز في السوق. محترف من الدرجة الأولى!",
        platform: "Glowpick",
      },
      {
        content: "أسامة بنى لنا منصة سريعة وموثوقة، تعرض مرافقنا بشكل جميل وتغطي كل احتياجاتنا. المشروع انسلم بالوقت وبالميزانية المحددة. محترف، متجاوب، وسلّم بالضبط اللي نبيه!",
        platform: "مدارس دريم العالمية",
      },
    ],
  },
};

export const SITE_CONTENT: SiteContent = {
  hero: TRANSLATIONS.en.hero,
  projects: TRANSLATIONS.en.projects,
  about: TRANSLATIONS.en.about,
  testimonials: TRANSLATIONS.en.testimonials,
};

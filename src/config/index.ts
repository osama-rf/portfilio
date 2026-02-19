import type { SiteConfig, SiteContent, Translations, ProblemItem, SolutionFeature, ProcessStep, WhyUsItem } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "osama-labs | تطبيقك جاهز خلال 14 يوم",
  author: "Osama AlRefay",
  description:
    "نبني تطبيقك كامل مع لوحة تحكم خلال 14 يوم. تطبيق جوال + لوحة إدارة + إشعارات + دعم مستمر.",
  lang: "ar",
  navLinks: [
    { text: "شوف النتيجة", href: "#projects" },
    { text: "كيف نشتغل", href: "#process" },
    { text: "ابدأ الآن", href: "#cta-section" },
  ],
  socialLinks: [
    { text: "LinkedIn", href: "https://linkedin.com/in/osama-alrefay" },
    { text: "Github", href: "https://github.com/osama-rf" },
  ],
  socialImage: "/osama-og.png",
  canonicalURL: "https://osama-lab.com",
};

export const PROBLEM_ITEMS: { en: ProblemItem[]; ar: ProblemItem[] } = {
  en: [
    {
      icon: "clock",
      title: "Takes Forever",
      description: "Months of development before you see anything real",
    },
    {
      icon: "money",
      title: "Unclear Costs",
      description: "Budgets keep growing with no end in sight",
    },
    {
      icon: "loop",
      title: "Endless Revisions",
      description: "Back and forth changes that delay everything",
    },
    {
      icon: "wrench",
      title: "Post-Launch Headaches",
      description: "No support after delivery, you're on your own",
    },
  ],
  ar: [
    {
      icon: "clock",
      title: "يقولك 6 شهور",
      description: "تروح لشركة تطوير يقولك المشروع يبي نص سنة على الأقل",
    },
    {
      icon: "money",
      title: "أسعار ما لها سقف",
      description: "يبدأ بـ 50 ألف وكل شوي يزيد السعر بحجج جديدة",
    },
    {
      icon: "loop",
      title: "ما تشوف نتيجة",
      description: "تدفع وتنتظر وما تشوف شيء ملموس إلا بعد شهور",
    },
    {
      icon: "wrench",
      title: "يسلمك ويختفي",
      description: "بعد ما يسلم المشروع ما ترد عليك ولا رسالة",
    },
  ],
};

export const SOLUTION_FEATURES: { en: SolutionFeature[]; ar: SolutionFeature[] } = {
  en: [
    { icon: "phone", text: "iOS & Android App" },
    { icon: "dashboard", text: "Admin Dashboard" },
    { icon: "bell", text: "Push Notifications" },
    { icon: "rocket", text: "Scalable Architecture" },
  ],
  ar: [
    { icon: "phone", text: "تطبيق جوال كامل لعملائك" },
    { icon: "dashboard", text: "لوحة تحكم تدير المستخدمين والخدمات والفئات" },
    { icon: "bell", text: "إشعارات فورية لكل مستخدم" },
    { icon: "rocket", text: "جاهز للإطلاق خلال 14 يوم" },
  ],
};

export const PROCESS_STEPS: { en: ProcessStep[]; ar: ProcessStep[] } = {
  en: [
    {
      number: "01",
      title: "Understanding Your Vision",
      description: "We sit with you, understand the idea, define the scope, and set clear expectations",
    },
    {
      number: "02",
      title: "Building & Execution",
      description: "We design and develop your app with continuous updates so you see progress daily",
    },
    {
      number: "03",
      title: "Launch & Support",
      description: "We deploy to the stores, hand you the keys, and stay with you after launch",
    },
  ],
  ar: [
    {
      number: "01",
      title: "كلمنا واتساب",
      description: "نفهم نشاطك ونحدد المطلوب بالضبط خلال جلسة واحدة",
    },
    {
      number: "02",
      title: "نبني خلال 14 يوم",
      description: "نصمم ونبني التطبيق مع لوحة التحكم. تشوف التقدم أول بأول وتعطينا ملاحظاتك",
    },
    {
      number: "03",
      title: "تطبيقك جاهز",
      description: "نسلمك التطبيق جاهز للنشر على المتاجر مع لوحة تحكم كاملة ودعم مستمر",
    },
  ],
};

export const WHY_US_ITEMS: { en: WhyUsItem[]; ar: WhyUsItem[] } = {
  en: [
    {
      icon: "experience",
      title: "Real Experience",
      description: "We've built and launched real apps used by real people",
    },
    {
      icon: "speed",
      title: "Fast Execution",
      description: "From idea to production in weeks, not months",
    },
    {
      icon: "chat",
      title: "Direct Communication",
      description: "You talk to the builder directly, no middlemen",
    },
    {
      icon: "target",
      title: "Results-Focused",
      description: "We care about your app succeeding, not just shipping code",
    },
  ],
  ar: [
    {
      icon: "experience",
      title: "سوّيناها قبل",
      description: "بنينا وأطلقنا تطبيقات حقيقية بنفس الطريقة — تطبيق + لوحة تحكم خلال 14 يوم",
    },
    {
      icon: "speed",
      title: "14 يوم مو 6 شهور",
      description: "بينما غيرنا يعطيك مواعيد بالشهور، نحن نسلمك تطبيق شغّال خلال أسبوعين",
    },
    {
      icon: "chat",
      title: "تكلم المطوّر مباشرة",
      description: "بدون وسطاء ولا مدراء مشاريع. تتكلم مع اللي يبني تطبيقك واتساب",
    },
    {
      icon: "target",
      title: "تسليم كامل بين يدك",
      description: "التطبيق لك، لوحة التحكم لك، الكود لك. ما نمسك عليك شيء",
    },
  ],
};

export const TRANSLATIONS: Translations = {
  en: {
    nav: {
      projects: "Projects",
      about: "About Us",
      featuredProjects: "Our Work",
      aboutMe: "About Us",
      testimonials: "Client Stories",
      businessCard: "Business Card",
      problem: "The Problem",
      solution: "The Solution",
      process: "How We Work",
      whyUs: "Why Us",
    },
    ui: {
      email: "Email",
      preview: "Preview",
      source: "Source",
      switchLang: "العربية",
      whatsapp: "Let's Chat on WhatsApp",
      ctaMain: "Ready to Launch?",
      ctaSubtitle: "Let's turn your idea into an app people love",
      techPartners: "Our Tech Stack",
      ourPartners: "Our Partners",
      heroBadge: "Available for New Projects",
      heroCTAPrimary: "Get a Quote",
      heroCTASecondary: "See Our Work",
      statProjects: "Apps Launched",
      statSatisfaction: "Client Satisfaction",
      statSupport: "Support",
      statPrice: "SAR Starting",
      trustDelivery: "On-Time Delivery",
      trustQuality: "Production Quality",
      trustSupport: "Post-Launch Support",
      businessCardTagline: "Your Tech Partner for Turning Ideas into Success",
      businessCardScan: "Scan the code to visit our website",
      businessCardCTA: "Contact Us Now",
      businessCardTitle: "Business Card",
      problemTitle: "Sound Familiar?",
      problemSubtitle: "Most app ideas die before they see the light",
      solutionTitle: "Fast Execution. Zero Shortcuts.",
      solutionDescription: "We use a smart execution methodology focused on the core of your app, delivering a launch-ready product in record time",
      processTitle: "How We Work",
      processSubtitle: "Clear from day one. No surprises.",
      whyUsTitle: "Why Work With Us?",
      ctaFinalTitle: "Ready to Start?",
      ctaFinalButton: "Message Us on WhatsApp",
      showcaseTitle: "App + Admin Dashboard in 14 Days",
      showcaseSubtitle: "Your client downloads the app while you manage everything from the dashboard. That's what we deliver.",
      showcaseAppLabel: "Client App",
      showcaseDashboardLabel: "Admin Dashboard",
      showcaseTagline: "Every project we deliver includes a full mobile app + admin dashboard for managing content, users, and notifications",
      industriesTitle: "Your App, Whatever Your Industry",
      industriesSubtitle: "We build apps for any service business that needs to manage clients and bookings",
      industriesMore: "And many more...",
    },
    pricing: {
      title: "What Does It Cost?",
      mvpText: "App + Admin Dashboard",
      priceFrom: "5,600",
      priceTo: "9,600",
      priceCurrency: "SAR",
      note: "Price depends on project scope and features required",
      ctaText: "Send Your Idea & Get a Custom Quote",
    },
    hero: {
      name: "osama-labs",
      specialty: "We Build Your App. From Idea to Launch.",
      summary:
        "We design and build mobile and web apps with production-level quality and fast turnaround. No long cycles, no wasted time.",
      email: "youremail@example.com",
    },
    projects: [
      {
        name: "Kedan",
        summary:
          "A comprehensive business communication platform for non-profit organizations, featuring workflow management, stakeholder collaboration, and tools to enhance organizational impact.",
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
          "Modern podcast web application built for Thmanyah media company, with responsive design and Arabic content optimization.",
        linkPreview:
          "https://thamanyah-assignment.vercel.app/?podcast=%D8%AB%D9%85%D8%A7%D9%86%D9%8A%D8%A5",
        image: "/Thmanyah-Icon-tab.svg",
      },
      {
        name: "Zaai AI",
        summary:
          "AI solutions platform for businesses — analytics, automation, and smart recommendations.",
        linkPreview: "https://zaai.vercel.app/ar",
        image: "/zaai-og.png",
      },
      {
        name: "Dream International Schools",
        summary:
          "Full website for Dream International Schools — services for students and parents, showcasing facilities.",
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
        content: "Osama understood our organization's unique needs and delivered a platform that truly empowers our teams. His expertise in building scalable solutions made a real difference.",
        platform: "Kedan",
      },
      {
        content: "The AI integration was complex, but he made it work seamlessly. His attention to detail and performance optimization made our app stand out in the market.",
        platform: "Glowpick",
      },
      {
        content: "Fast, reliable, and delivered exactly what we needed — on time and within budget. Professional and responsive throughout the entire project.",
        platform: "Dream International Schools",
      },
    ],
  },
  ar: {
    nav: {
      projects: "مشاريعنا",
      about: "عنّا",
      featuredProjects: "أعمالنا",
      businessCard: "بطاقة الأعمال",
      aboutMe: "عنّا",
      testimonials: "قالوا عنّا",
      problem: "المشكلة",
      solution: "الحل",
      process: "كيف نشتغل",
      whyUs: "ليش نحن",
    },
    ui: {
      email: "الإيميل",
      preview: "معاينة",
      source: "الكود",
      switchLang: "English",
      whatsapp: "اطلب تطبيقك الآن",
      ctaMain: "مستعد تبدأ؟",
      ctaSubtitle: "كلمنا واتساب وخلال 14 يوم تطبيقك يكون جاهز",
      techPartners: "تقنياتنا",
      ourPartners: "شركاؤنا",
      heroBadge: "نقبل مشاريع جديدة الآن",
      heroCTAPrimary: "ابدأ مشروعك الآن",
      heroCTASecondary: "شوف النتيجة",
      statProjects: "تطبيق أطلقناه",
      statSatisfaction: "رضا العملاء",
      statSupport: "يوم للتسليم",
      statPrice: "ريال سعر البداية",
      trustDelivery: "تسليم بالوقت",
      trustQuality: "جودة إنتاج",
      trustSupport: "دعم بعد الإطلاق",
      businessCardTagline: "شريكك التقني في تحويل افكارك لنجاحات",
      businessCardScan: "امسح الكود لزيارة موقعنا",
      businessCardCTA: "تواصل معنا الآن",
      businessCardTitle: "بطاقة الأعمال",
      problemTitle: "صار معك كذا قبل؟",
      problemSubtitle: "تبي تطبيق لنشاطك بس كل ما تسأل مطوّر يقولك شهور وأرقام خيالية",
      solutionTitle: "وش تاخذ بالضبط؟",
      solutionDescription: "تطبيق جوال كامل + لوحة تحكم تدير كل شيء. كل هذا خلال 14 يوم فقط.",
      processTitle: "كيف نشتغل؟",
      processSubtitle: "من أول رسالة واتساب لتطبيقك على المتجر — 3 خطوات بس.",
      whyUsTitle: "ليش تشتغل معنا؟",
      ctaFinalTitle: "نشاطك يستاهل تطبيق",
      ctaFinalButton: "اطلب تطبيقك الآن",
      showcaseTitle: "تطبيق + لوحة تحكم خلال 14 يوم",
      showcaseSubtitle: "عميلك يحمّل التطبيق وأنت تدير كل شيء من لوحة التحكم. هذا اللي نسلمك إياه.",
      showcaseAppLabel: "تطبيق العميل",
      showcaseDashboardLabel: "لوحة التحكم",
      showcaseTagline: "كل مشروع نسلمه يشمل تطبيق جوال كامل + لوحة تحكم لإدارة المحتوى والمستخدمين والإشعارات",
      industriesTitle: "تطبيقك مهما كان مجالك",
      industriesSubtitle: "نبني تطبيقات لأي نشاط يقدم خدمات ويحتاج يدير عملاءه وحجوزاته",
      industriesMore: "وغيرها الكثير...",
    },
    pricing: {
      title: "كم التكلفة؟",
      mvpText: "تطبيق + لوحة تحكم",
      priceFrom: "5,600",
      priceTo: "9,600",
      priceCurrency: "ريال",
      note: "السعر يعتمد على حجم المشروع والمميزات المطلوبة",
      ctaText: "اطلب تطبيقك الآن",
    },
    hero: {
      name: "osama-labs",
      specialty: "تطبيقك جاهز خلال 14 يوم.",
      summary:
        "نبني لك تطبيق جوال كامل مع لوحة تحكم تدير فيها كل شيء — المستخدمين، الخدمات، الفئات، والإشعارات.",
      email: "youremail@example.com",
    },
    projects: [
      {
        name: "كدان",
        summary: "منصة تواصل أعمال متكاملة للمؤسسات غير الربحية. إدارة سير العمل وأدوات تعاونية تعزز أثر المؤسسة وتسهل التواصل بين الفرق.",
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
          "تطبيق ويب حديث للبودكاست مبني لشركة ثمانية الإعلامية، بتصميم متجاوب ومحسّن للمحتوى العربي.",
        linkPreview:
          "https://thamanyah-assignment.vercel.app/?podcast=%D8%AB%D9%85%D8%A7%D9%86%D9%8A%D8%A9",
        image: "/Thmanyah-Icon-tab.svg",
      },
      {
        name: "Zaai AI",
        summary: "منصة حلول ذكاء اصطناعي للأعمال — تحليلات، أتمتة، وتوصيات ذكية.",
        linkPreview: "https://zaai.vercel.app/ar",
        image: "/zaai-og.png",
      },
      {
        name: "مدارس دريم العالمية",
        summary:
          "موقع متكامل لمدارس دريم العالمية. خدمات للطلاب وأولياء الأمور واستعراض المرافق.",
        linkPreview: "https://dis-sa.vercel.app/ar",
        image: "/dis.png",
      },
    ],
    about: {
      description: `
        فريق سعودي متخصص في بناء التطبيقات اللي تسهل حياة الناس.
        من المتاجر الإلكترونية لمنصات الذكاء الاصطناعي، تركيزنا على الواجهة النظيفة والأداء العالي والقابلية للتوسع.
      `,
      image: "/osama.webp",
    },
    testimonials: [
      {
        content: "أسامة فهم احتياجات مؤسستنا وسلّمنا منصة تمكّن فرقنا بشكل حقيقي. خبرته في بناء حلول قابلة للتوسع خلت فرق واضح في أثر مؤسستنا.",
        platform: "كدان",
      },
      {
        content: "دمج الذكاء الاصطناعي كان معقد، لكن خلاه يشتغل بكل سلاسة. اهتمامه بالتفاصيل وتحسين الأداء خلى التطبيق يبرز في السوق.",
        platform: "Glowpick",
      },
      {
        content: "منصة سريعة وموثوقة، انسلمت بالوقت وبالميزانية. محترف، متجاوب، وسلّم بالضبط اللي نبيه!",
        platform: "مدارس دريم العالمية",
      },
    ],
  },
};

export const SITE_CONTENT: SiteContent = {
  hero: TRANSLATIONS.ar.hero,
  projects: TRANSLATIONS.ar.projects,
  about: TRANSLATIONS.ar.about,
  testimonials: TRANSLATIONS.ar.testimonials,
};

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
      projects: "Projects",
      about: "About",
      featuredProjects: "Featured Projects",
      aboutMe: "About Me",
    },
    ui: {
      email: "Email",
      preview: "Preview",
      source: "Source",
      switchLang: "العربية",
      whatsapp: "Let's Chat on WhatsApp",
      ctaMain: "Ready to Build Your Success? 🚀",
      ctaSubtitle: "Let's Turn Your Idea Into Reality",
      ebookCta: "Get The Guide",
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
      name: "Osama Refay",
      specialty: "Your Tech Partner for Turning Ideas into Success",
      summary:
        "I help entrepreneurs and businesses turn ideas into mobile and web apps that actually work and scale.",
      email: "youremail@example.com",
    },
    projects: [
      {
        name: "Complete Guide to Building AI Websites & Apps 🚀",
        summary:
          "🚀 'Complete Guide to Building AI Websites & Apps' teaches you how to turn any idea into a ready app in hours, without programming experience. Over 50 ready commands + practical projects + plugins that make everything easier!",
        linkPreview: "https://osama-lab.com/products/%D8%A7%D9%84%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%B4%D8%A7%D9%85%D9%84-%D9%84%D8%A8%D9%86%D8%A7%D8%A1-%D8%A7%D9%84%D9%85%D9%88%D8%A7%D9%82%D8%B9-%D9%88%D8%A7%D9%84%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%D8%A7%D8%AA-%D8%A8%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A",
        image: "/ebook.png",
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
        I'm Osama Refay, a Saudi software engineer who loves building apps that make life easier.
        From e-commerce to AI-powered platforms, I focus on clean UI, high performance, and scalability.
        Co-founder of Mutfarid, builder of Glowpick and Zaai AI.
      `,
      image: "/osama.webp",
    },
  },
  ar: {
    nav: {
      projects: "مشاريعي",
      about: "عنّي",
      featuredProjects: "مشاريعي",
      aboutMe: "عنّي",
    },
    ui: {
      email: "الإيميل",
      preview: "معاينة",
      source: "الكود",
      switchLang: "English",
      whatsapp: "يلا نتواصل على الواتس",
      ctaMain: " جاهز نبني نجاحك؟" + " 🚀",
      ctaSubtitle: "يلا نحول فكرتك لواقع",
      ebookCta: "احصل على الدليل",
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
      name: "أسامة الرفاعي",
      specialty: "شريكك التقني في تحويل افكارك لنجاحات",
      summary:
        "أساعد رواد الأعمال والشركات يحولون أفكارهم لتطبيقات ويب وجوال تشتغل وتكبر معهم.",
      email: "youremail@example.com",
    },
    projects: [
      {
        name: "الدليل الشامل لبناء اﳌواقع والتطبيقات بالذكاء اﻻصطناعي 🚀",
        summary: "🚀 كتاب 'الدليل الشامل لبناء المواقع والتطبيقات بالذكاء الاصطناعي' يعلّمك كيف تحوّل أي فكرة لتطبيق جاهز في ساعات، بدون خبرة برمجية. أكثر من 50 أمر جاهز + مشاريع عملية + ملحقات تسهّل عليك كل شيء!",
        linkPreview: "https://osama-lab.com/products/%D8%A7%D9%84%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%B4%D8%A7%D9%85%D9%84-%D9%84%D8%A8%D9%86%D8%A7%D8%A1-%D8%A7%D9%84%D9%85%D9%88%D8%A7%D9%82%D8%B9-%D9%88%D8%A7%D9%84%D8%AA%D8%B7%D8%A8%D9%8A%D9%82%D8%A7%D8%AA-%D8%A8%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A",
        image: "/ebook.png",
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
        هلا! أنا أسامة رفاعي، مهندس برمجيات سعودي أحب أحول الأفكار لمنتجات تشتغل وتنجح.
        من المتاجر الإلكترونية لمنصات الذكاء الاصطناعي، تركيزي دايم على الواجهة النظيفة والأداء العالي
      `,
      image: "/osama.webp",
    },
  },
};

export const SITE_CONTENT: SiteContent = {
  hero: TRANSLATIONS.en.hero,
  projects: TRANSLATIONS.en.projects,
  about: TRANSLATIONS.en.about,
};

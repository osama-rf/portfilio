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
        name: "Glowpick",
        summary:
          "AI-powered skincare analysis app with e-commerce integration.",
        linkPreview: "https://apps.apple.com/sa/app/glowpick/id6737756143",
        image: "/glowpick.png",
      },
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
        name: "Glowpick",
        summary: "تطبيق ذكاء اصطناعي لتحليل البشرة مع متجر إلكتروني.",
        linkPreview: "https://apps.apple.com/sa/app/glowpick/id6737756143",
        image: "/glowpick.png",
      },
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

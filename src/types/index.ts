export interface SiteConfig extends HeaderProps {
  title: string;
  description: string;
  lang: string;
  author: string;
  socialLinks: { text: string; href: string }[];
  socialImage: string;
  canonicalURL?: string;
}

export interface SiteContent {
  hero: HeroProps;
  projects: ProjectProps[];
  about: AboutProps;
  testimonials: TestimonialProps[];
}

export interface Translations {
  en: SiteContent & {
    nav: {
      projects: string;
      about: string;
      featuredProjects: string;
      aboutMe: string;
      testimonials: string;
      [key: string]: string;
    };
    ui: { [key: string]: string };
    pricing: PricingProps;
  };
  ar: SiteContent & {
    nav: {
      projects: string;
      about: string;
      featuredProjects: string;
      aboutMe: string;
      testimonials: string;
      [key: string]: string;
    };
    ui: { [key: string]: string };
    pricing: PricingProps;
  };
}

export interface HeroProps {
  name: string;
  specialty: string;
  summary: string;
  email: string;
}


export interface ProjectProps {
  name: string;
  summary: string;
  image: string;
  linkPreview: string;
}

export interface AboutProps {
  description: string;
  image: string;
}

export interface PricingProps {
  title: string;
  mvpText: string;
  priceFrom: string;
  priceTo: string;
  priceCurrency: string;
  note: string;
  ctaText: string;
}

export interface HeaderProps {
  navLinks: { text: string; href: string }[];
}

export interface TestimonialProps {
  content: string;
  platform: string;
}

export interface ProblemItem {
  icon: string;
  title: string;
  description: string;
}

export interface SolutionFeature {
  icon: string;
  text: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface WhyUsItem {
  icon: string;
  title: string;
  description: string;
}

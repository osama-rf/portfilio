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
}

export interface Translations {
  en: SiteContent & {
    nav: { 
      projects: string;
      about: string;
      featuredProjects: string;
      aboutMe: string;
      [key: string]: string;
    };
    ui: { [key: string]: string };
  };
  ar: SiteContent & {
    nav: { 
      projects: string;
      about: string;
      featuredProjects: string;
      aboutMe: string;
      [key: string]: string;
    };
    ui: { [key: string]: string };
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

export interface HeaderProps {
  navLinks: { text: string; href: string }[];
}

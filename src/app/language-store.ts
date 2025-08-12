import { TRANSLATIONS } from "@config";

type Language = 'en' | 'ar';

class LanguageStore {
  private currentLang: Language = 'ar';
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && (saved === 'en' || saved === 'ar')) {
        this.currentLang = saved;
      }
      this.updateDocument();
    }
  }

  get language(): Language {
    return this.currentLang;
  }

  get content() {
    return TRANSLATIONS[this.currentLang];
  }

  get isRTL(): boolean {
    return this.currentLang === 'ar';
  }

  setLanguage(lang: Language) {
    if (lang !== this.currentLang) {
      this.currentLang = lang;
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
        this.updateDocument();
      }
      this.notifyListeners();
    }
  }

  toggleLanguage() {
    this.setLanguage(this.currentLang === 'en' ? 'ar' : 'en');
  }

  private updateDocument() {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', this.isRTL ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', this.currentLang);
    }
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export const languageStore = new LanguageStore();
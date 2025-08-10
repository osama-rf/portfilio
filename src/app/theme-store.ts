type Theme = 'dark' | 'light';

class ThemeStore {
  private currentTheme: Theme = 'light';
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme;
      if (saved && (saved === 'dark' || saved === 'light')) {
        this.currentTheme = saved;
      } else {
        // Default to light theme
        this.currentTheme = 'light';
      }
      this.updateDocument();
    }
  }

  get theme(): Theme {
    return this.currentTheme;
  }

  get isDark(): boolean {
    return this.currentTheme === 'dark';
  }

  get isLight(): boolean {
    return this.currentTheme === 'light';
  }

  setTheme(theme: Theme) {
    if (theme !== this.currentTheme) {
      this.currentTheme = theme;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
        this.updateDocument();
      }
      this.notifyListeners();
    }
  }

  toggleTheme() {
    this.setTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
  }

  private updateDocument() {
    if (typeof document !== 'undefined') {
      if (this.isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      document.documentElement.setAttribute('data-theme', this.currentTheme);
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

export const themeStore = new ThemeStore();
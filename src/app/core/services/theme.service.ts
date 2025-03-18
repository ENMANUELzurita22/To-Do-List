import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private _darkMode = new BehaviorSubject<boolean>(false);
  public readonly darkMode$ = this._darkMode.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  private initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('darkMode');
    
    if (storedTheme !== null) {
      this._darkMode.next(storedTheme === 'true');
    } else {
      this._darkMode.next(prefersDark.matches);
    }
    
    this.updateTheme();
    
    prefersDark.addEventListener('change', (mediaQuery) => {
      if (localStorage.getItem('darkMode') === null) {
        this._darkMode.next(mediaQuery.matches);
        this.updateTheme();
      }
    });
  }

  toggleDarkMode() {
    this._darkMode.next(!this._darkMode.value);
    localStorage.setItem('darkMode', this._darkMode.value.toString());
    this.updateTheme();
  }

  private updateTheme() {
    if (this._darkMode.value) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }
}

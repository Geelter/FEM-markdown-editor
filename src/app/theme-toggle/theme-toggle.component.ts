import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent  implements OnInit, OnDestroy {
  private readonly darkModeListener: EventListener;
  isChecked: boolean;
  isForced: boolean;

  setColorMode(mode: string | null = null) {
    if (mode) {
      document.documentElement.setAttribute('data-force-color-mode', mode);
      window.localStorage.setItem('color-mode', mode);
    } else {
      document.documentElement.removeAttribute('data-force-color-mode');
      window.localStorage.removeItem('color-mode');
    }
  }

  onCheckboxClick() {
    this.isChecked = !this.isChecked;
    this.isForced = true;
    this.setColorMode(this.isChecked ? 'light' : 'dark');
  }

  onResetClick() {
    this.setColorMode();
    this.isChecked = window.matchMedia('(prefers-color-scheme: light)').matches;
    this.isForced = false;
  }

  ngOnInit() {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', this.darkModeListener);
  }

  ngOnDestroy() {
    window.matchMedia('(prefers-color-scheme: light)').removeEventListener('change', this.darkModeListener);
  }

  constructor() {
    const colorModeOverride = window.localStorage.getItem("color-mode");

    // Check the dark-mode checkbox if
    // - The override is set to dark
    // - No override is set but the system prefers dark mode
    this.isChecked = colorModeOverride === "light" ||
      (!colorModeOverride &&
        window.matchMedia("(prefers-color-scheme: light)").matches);
    this.isForced = !!colorModeOverride;

    this.darkModeListener = (e) => {
      if (!document.documentElement.getAttribute('data-force-color-mode')) {
        this.isChecked = (e as MediaQueryListEvent).matches;
      }
    }
  }
}

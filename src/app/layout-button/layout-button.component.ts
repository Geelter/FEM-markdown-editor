import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout-button.component.html',
  styleUrls: ['./layout-button.component.scss']
})
export class LayoutButtonComponent {
  isActive = false;
  isHovered = false;

  toggleIsActive() {
    this.isActive = !this.isActive;
  }
  toggleIsHovered() {
    this.isHovered = !this.isHovered;
  }
}

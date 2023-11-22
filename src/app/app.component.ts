import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {TopbarComponent} from "./topbar/topbar.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {SidebarService} from "./services/sidebar.service";
import {EditorComponent} from "./editor/editor.component";
import {OutputComponent} from "./output/output.component";
import {LayoutButtonComponent} from "./layout-button/layout-button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopbarComponent, SidebarComponent, EditorComponent, OutputComponent, LayoutButtonComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private sidebarService = inject(SidebarService);

  isSidebarOpen$ = this.sidebarService.isSidebarOpen$;
  isLayoutFullsize = false;

  title = 'markdown-editor';

  toggleContentLayout() {
    this.isLayoutFullsize = !this.isLayoutFullsize;
  }

  hideSidebar() {
    this.sidebarService.hideSidebar();
  }
}

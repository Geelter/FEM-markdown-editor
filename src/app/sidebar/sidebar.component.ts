import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from "../file/file.component";
import { StorageService } from "../services/storage.service";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FileComponent, ThemeToggleComponent],
  templateUrl: './sidebar.component.html',
  host: {'class': 'flow'},
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    storageService = inject(StorageService);

    fileMetadata$ = this.storageService.markdownAllMetadata$;

    createNewDocument() {
        const id = crypto.randomUUID();
        const meta = {
            id,
            name: 'new-file.md',
            createdAt: new Date(),
        };

        const content = {
            id,
            content: '# Edit away',
        };

        this.storageService.createFile(meta, content);
    }

    chooseFile(id: string) {
        this.storageService.changeCurrentFile(id);
    }
}

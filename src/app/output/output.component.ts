import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StorageService} from "../services/storage.service";
import {MarkdownModule} from "ngx-markdown";

@Component({
  selector: 'app-output',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent {
  @Input() isFullsize = false;

  private storageService = inject(StorageService);

  currentFileContent$ = this.storageService.currentFileContent.asObservable();
}

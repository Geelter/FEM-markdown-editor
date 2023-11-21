import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MarkdownFileMetadata} from "../models/markdown-file";

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {
  @Input({ required: true }) fileMetadata: MarkdownFileMetadata | undefined;
}

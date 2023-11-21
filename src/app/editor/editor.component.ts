import {Component, ElementRef, inject, Renderer2} from '@angular/core';
import { CommonModule } from '@angular/common';
import {StorageService} from "../services/storage.service";
import {BehaviorSubject, debounceTime, distinctUntilChanged, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
    private elementRef = inject(ElementRef);
    private storageService = inject(StorageService);

    textareaValue = new BehaviorSubject<string | undefined>(undefined);
    private textareaValue$ = this.textareaValue.asObservable()
        .pipe(
            takeUntilDestroyed(),
            debounceTime(500),
            distinctUntilChanged(),
            tap(value => {
                this.storageService.currentFileContent.next(value);
                this.storageService.updateCurrentContent();
            })
        ).subscribe();

    currentFileContent$ = this.storageService.currentFileContent$
        .pipe(
            tap(value => this.elementRef.nativeElement.dataset.replicatedValue = value?.content)
        );

    onInputChange(input: string) {
        this.elementRef.nativeElement.dataset.replicatedValue = input;
        this.textareaValue.next(input);
    }
}

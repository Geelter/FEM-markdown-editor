import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarService} from "../services/sidebar.service";
import {StorageService} from "../services/storage.service";
import {BehaviorSubject, debounceTime, distinctUntilChanged, tap} from "rxjs";
import {FormsModule} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @ViewChild('deleteDialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;

  private sidebarService = inject(SidebarService);
  private storageService = inject(StorageService);

  inputValue = new BehaviorSubject<string | undefined>(undefined);
  private inputValue$ = this.inputValue.asObservable()
      .pipe(
          takeUntilDestroyed(),
          debounceTime(500),
          distinctUntilChanged(),
          tap(value => {
            this.storageService.currentFileName.next(value);
            this.storageService.updateCurrentMetadata();
          })
      ).subscribe();

  currentFileMetadata$ = this.storageService.currentFileMetadata$;

  onClick() {
    this.sidebarService.toggleSidebar();
  }

  onDeleteClick() {
    this.dialog.nativeElement.showModal();
  }

  onSaveClick() {
    this.storageService.updateCurrentFile();
  }

  onDialogConfirm() {
    this.storageService.deleteCurrentFile();
    this.dialog.nativeElement.close();
  }
}

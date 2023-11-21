import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isSidebarOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isSidebarOpen$: Observable<boolean> = this.isSidebarOpen.asObservable();

  toggleSidebar() {
    this.isSidebarOpen.next(!this.isSidebarOpen.value);
  }

  hideSidebar() {
    this.isSidebarOpen.next(false);
  }
}

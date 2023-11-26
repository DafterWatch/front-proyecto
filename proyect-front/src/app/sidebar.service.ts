import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isSidebarVisible = new BehaviorSubject<boolean>(true);
  isSidebarVisible$ = this.isSidebarVisible.asObservable();
  constructor() {
    this.checkScreenWidth();
  }
  checkScreenWidth() {
    const screenWidth = window.innerWidth;
    const isSmallScreen = screenWidth <= 768;

    this.isSidebarVisible.next(!isSmallScreen);
  }
  toggleSidebar() {
    this.isSidebarVisible.next(!this.isSidebarVisible.value);
  }
}

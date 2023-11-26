import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SidebarService } from 'src/app/sidebar.service';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss'],
})
export class AppMainComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    public sidebarService: SidebarService
  ) {}
  ngOnInit(): void {
    this.checkScreenWidth();
  }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenWidth();
  }
  checkScreenWidth(): void {
    this.sidebarService.checkScreenWidth();
  }
}

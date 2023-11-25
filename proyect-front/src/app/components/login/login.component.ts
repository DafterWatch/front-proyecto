import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = ''
  password = ''
  constructor(private authService: AuthService, private router: Router) {}
  login() {
    this.authService.login();
    this.router.navigate(['/app/home']);
  }
}

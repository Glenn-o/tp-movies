import { Component } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'tp-movies-login',
  standalone: true,
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user: firebase.default.User | null = null;

  constructor(public authService: AuthenticationService) {
    this.authService.user$.subscribe((user) => (this.user = user));
  }
}

import { Component } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'tp-movies-login',
  standalone: true,
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(public authService: AuthenticationService) {
  }
}

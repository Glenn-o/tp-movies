import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'tp-movies-login',
  standalone: true,
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  imports: [RouterLink, NgIf],
})
export class LoginComponent {
  errorMessage = '';

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router,
  ) {}

  login(email: string, password: string) {
    this.authService.signIn(email, password).subscribe((isLogged) => {
      if (isLogged) this.router.navigate(['/']);

      this.errorMessage = 'Email or password is not valid';
    });
  }
}

import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'tp-movies-sign-in',
  standalone: true,
  template: ` <div class="authBlock">
    <h3>CONNEXION</h3>
    <p>{{user?.email}}</p>
    <div class="formGroup">
      <input
        type="text"
        class="formControl"
        placeholder="Username"
        #userEmail
        required
      />
    </div>
    <div class="formGroup">
      <input
        type="password"
        class="formControl"
        placeholder="Password"
        #userPassword
        required
      />
    </div>
    
    <div class="formGroup">
      <input
        type="button"
        class="btn btnPrimary"
        value="Sign Up"
        (click)="
          authService.SignIn(userEmail.value, userPassword.value)
        "
      />
    </div>
  </div>`,
})
export class SignInComponent {
  user: firebase.default.User | null = null;

  constructor(public authService: AuthenticationService) {
    this.authService.user$.subscribe(
      (user) => (this.user = user)
    )
  }
}
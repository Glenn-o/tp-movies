import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'tp-movies-sign-up',
  standalone: true,
  template: ` <div class="authBlock">
    <h3>INSCRIPTION</h3>
    <div class="formGroup">
      <input
        type="email"
        class="formControl"
        placeholder="Email"
        #userEmail
        required
      />
    </div>
    <div class="formGroup">
      <input
        type="text"
        class="formControl"
        placeholder="Username"
        #userUsername
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
          authenticationService.SignUp(userEmail.value, userPassword.value, userUsername.value)
        "
      />
    </div>
  </div>`,
})
export class SignUpComponent {
  constructor(public authenticationService: AuthenticationService) {}
}
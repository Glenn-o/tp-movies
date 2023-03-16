import { Component } from '@angular/core';
import { FileUpload } from '../models/file-upload.model';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'tp-movies-register',
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
    <div>
      <input type="file" #userFile accept=".png, .jpeg, .jpg">
    </div>
    
    <div class="formGroup">
      <input
        type="button"
        class="btn btnPrimary"
        value="Sign Up"
        (click)="register(userEmail.value, userPassword.value, userUsername.value, userFile.files)"
      />
    </div>
  </div>`,
})
export class RegisterComponent {
  constructor(private authenticationService: AuthenticationService) {

  }

  register(email: string, password: string, username: string, file: any) {
    const currentFile = file[0] ? new FileUpload(file[0]) : null
    this.authenticationService.SignUp(email, password, username, currentFile)
  }
}
import { Component } from '@angular/core';
import { FileUpload } from '../../models/file-upload.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'tp-movies-register',
  standalone: true,
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(private authenticationService: AuthenticationService) {}

  register(
    email: string,
    password: string,
    username: string,
    file: FileList | null,
  ) {
    const currentFile = new FileUpload(file && file[0]);
    this.authenticationService.signUp(email, password, username, currentFile);
  }
}

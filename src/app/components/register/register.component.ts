import { Component } from '@angular/core';
import { FileUpload } from '../../models/file-upload.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { NgIf } from '@angular/common';
import { Observable, Subject } from 'rxjs';

@Component({
  imports: [RouterLink, WebcamModule, NgIf],
  selector: 'tp-movies-register',
  standalone: true,
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  errorMessage = '';
  isWebcam = false;
  webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();

  constructor(
    private authenticationService: AuthenticationService,
    private readonly router: Router,
  ) {}

  register(
    email: string,
    password: string,
    username: string,
    file: FileList | null,
  ): void {
    const currentFile = new FileUpload(file && file[0]);
    this.authenticationService
      .signUp(email, password, username, currentFile)
      .subscribe((isRegister) => {
        if (isRegister === true) this.router.navigate(['/']);
  
        console.log(isRegister.message)
        switch(isRegister.message) {
          case 'Firebase: The email address is badly formatted. (auth/invalid-email).': 
            this.errorMessage = 'The email address is badly formatted.'
            break;
          case 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).':
              this.errorMessage = 'The email address is already in use by another account.'
            break;
          default: 
            break;
        }
      });
  }

  displayWebcam(): void {
    this.isWebcam = true;
  }

  takePicture(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    const input = <HTMLInputElement>(
      document.querySelector('input[type="file"]')
    );
    this.urltoFile(
      webcamImage.imageAsDataUrl,
      'avatar.jpeg',
      'image/jpeg',
    ).then(function (file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
    });
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  async urltoFile(url: string, filename: string, mimeType: string) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }
}

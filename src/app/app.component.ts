import { Component } from '@angular/core';
import { SignInComponent } from './login/signin.component';
import { SignUpComponent } from './login/signup.component';

@Component({
  imports: [SignInComponent, SignUpComponent],
  standalone: true,
  selector: 'tp-movies-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

}

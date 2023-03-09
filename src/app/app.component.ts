import { Component } from '@angular/core';
import { SignInComponent } from './login/signin.component';

@Component({
  standalone: true,
  imports: [SignInComponent],
  selector: 'tp-movies-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

}

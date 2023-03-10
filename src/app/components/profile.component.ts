import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'tp-movies-profile',
  standalone: true,
  template: `
    <div>
      <h3>Profile</h3>
      <p>{{user?.email}}</p>
    </div>
  `,
})

export class ProfileComponent {
  user: firebase.default.User | null = null;

  constructor(private authService: AuthenticationService) {
    this.authService.user$.subscribe(
      (user) => (this.user = user)
    )
  }
}

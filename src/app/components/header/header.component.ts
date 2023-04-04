import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserInfo } from 'src/app/ngrx/user/user.reducer';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  imports: [NgIf, RouterLink, AsyncPipe],
  selector: 'tp-movies-header',
  standalone: true,
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  user$ = this.store.select(selectUserInfo);
  isDropdownOpen = false;
  constructor(
    private authService: AuthenticationService,
    private readonly store: Store,
  ) {}

  handleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.authService.logout()
  }
}

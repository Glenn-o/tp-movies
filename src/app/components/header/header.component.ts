import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { User, UsersService } from 'src/app/shared/services/users.service';

@Component({
  imports: [NgIf, RouterLink, AsyncPipe],
  selector: 'tp-movies-header',
  standalone: true,
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  isDropdownOpen = false;
  constructor(
    private usersService: UsersService,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.usersService
        .getUserInfoById(<string>user?.uid)
        .subscribe((userInfo) => {
          this.user = userInfo[0];
        });
    });
  }

  handleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.authService.logout()
  }
}

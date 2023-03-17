import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { User, UsersService } from '../../shared/services/users.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [NgIf, FormsModule],
  selector: 'tp-movies-user',
  standalone: true,
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  userInfo: User | null = null;

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.authService.user$.subscribe((user) => {
      this.usersService
        .getUserInfoById(id || <string>user?.uid)
        .subscribe((userInfo) => {
          if (!userInfo.length) this.router.navigateByUrl('/');
          this.userInfo = userInfo[0];
        });
    });
  }
}

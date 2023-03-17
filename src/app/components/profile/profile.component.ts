import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { User, UsersService } from '../../shared/services/users.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilesService } from 'src/app/shared/services/files.service';
import { FileUpload } from 'src/app/models/file-upload.model';

@Component({
  imports: [NgIf, FormsModule],
  selector: 'tp-movies-profile',
  standalone: true,
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userInfo: User | null = null;
  username: string | undefined = undefined;
  email: string | undefined = undefined;
  avatar: string | undefined = undefined;
  isEditing: boolean;

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private filesService: FilesService,
    private router: Router,
  ) {
    this.isEditing = false;
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.usersService
        .getUserInfoById(<string>user?.uid)
        .subscribe((userInfo) => {
          if (!userInfo.length) this.router.navigateByUrl('/');
          this.userInfo = userInfo[0];
          this.username = userInfo[0].username;
          this.email = userInfo[0].email;
          this.avatar = userInfo[0].avatar;
        });
    });
  }

  handleEditing(): void {
    this.isEditing = !this.isEditing;
  }

  onImageEditing(): void {
    const inputImage = document.getElementsByName('avatar')[0];
    inputImage.click();
  }

  onSubmit(): void {
    if (!this.username?.length) {
      this.username = this.userInfo?.username;
    }
    if (!this.email?.length) {
      this.email = this.userInfo?.email;
    }

    if (this.username?.length && this.email?.length) {
      this.usersService.updateUser({
        userId: this.userInfo?.userId as string,
        username: this.username as string,
        email: this.email as string,
        avatar: this.userInfo?.avatar as string,
      });
      const inputImage = document.getElementsByName(
        'avatar',
      )[0] as HTMLInputElement;
      const newAvatar = inputImage.files?.[0] as File;
      if (newAvatar) {
        const newUplaodAvatar = new FileUpload(newAvatar);
        this.filesService.uploadFile(newUplaodAvatar, this.userInfo as User);
      }
    }

    this.handleEditing();
  }

  onReset(): void {
    this.username = this.userInfo?.username;
    this.email = this.userInfo?.email;
    this.avatar = this.userInfo?.avatar;
    this.handleEditing();
  }
}

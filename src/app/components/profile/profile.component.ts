import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { User, UsersService } from '../../shared/services/users.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilesService } from 'src/app/shared/services/files.service';
import { FileUpload } from 'src/app/models/file-upload.model';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Observable, Subject, forkJoin, switchMap } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { LikesService } from 'src/app/shared/services/likes.service';
import { MovieDetails } from 'src/types/MovieDetails';
import { Like } from 'src/types/Movies';

@Component({
  imports: [NgIf, FormsModule, WebcamModule, AsyncPipe, NgFor, RouterLink],
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
  isWebcam = false;
  webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();
  likedMovies$: Observable<Like[]> | undefined = undefined
  moviesDetails$: Observable<MovieDetails[]> | undefined = undefined

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private filesService: FilesService,
    private moviesService: ApiService,
    private likesService: LikesService,
    private router: Router,
  ) {
    this.isEditing = false;
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.usersService
        .getUserInfoById(<string>user?.uid)
        .subscribe((userInfo) => {
          if (!userInfo.length) this.router.navigateByUrl('/404');
          this.userInfo = userInfo[0];
          this.username = userInfo[0].username;
          this.email = userInfo[0].email;
          this.avatar = userInfo[0].avatar;
          this.likedMovies$ = this.likesService.getLikesByUserId(this.userInfo?.userId as string);
          this.moviesDetails$ = this.likedMovies$?.pipe(
            switchMap((likes) => {
              if (!likes) return [];
              const movieIds = likes.map((like) => String(like.movieId));
              const requests = movieIds.map((movieId) => this.moviesService.getMovieById(movieId));
              return forkJoin(requests);
            }),
          );
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
    this.isWebcam = false;
    this.webcamImage = null;
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
    this.isWebcam = false;
    this.webcamImage = null;
    this.handleEditing();
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
    this.urltoFile(webcamImage.imageAsDataUrl, 'avatar.jpeg', 'image/jpeg').then(
      function (file) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
      },
    );
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

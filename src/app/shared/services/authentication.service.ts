import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, catchError, of, Observable, from, take } from 'rxjs';
import { User, UsersService } from './users.service';
import { Store } from '@ngrx/store';
import { UserReceived } from 'src/app/ngrx/user/user.action';
import { FileUpload } from 'src/app/models/file-upload.model';
import { FilesService } from './files.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user$: Observable<firebase.default.User | null> = this.afAuth.user;

  constructor(
    public afAuth: AngularFireAuth,
    private usersService: UsersService,
    private _store: Store,
    private filesService: FilesService,
    private router: Router,
  ) {}

  signUp(
    email: string,
    password: string,
    username: string,
    file: FileUpload | null,
  ) {
    const isRegister = from(
      this.afAuth.createUserWithEmailAndPassword(email, password),
    ).pipe(
      map((res) => {
        const userId = <string>res.user?.uid;
        const user: User = { email, username, userId, avatar: '' };
        this.usersService.createUser(user);
        file && this.filesService.uploadFile(file, user);
        this.router.navigate(['/']);
      }),
      catchError((error) => of(error)),
    );

    return isRegister;
  }

  signIn(email: string, password: string) {
    const isLogged = from(
      this.afAuth.signInWithEmailAndPassword(email, password),
    ).pipe(
      map((res) => {
        if (res.user) {
          this.usersService
            .getUserInfoById(res.user?.uid)
            .subscribe((users) => {
              this._store.dispatch(UserReceived({ user: users[0] }));
            });
        }
        return !!res.user;
      }),
      catchError(() => of(false)),
    );

    return isLogged;
  }

  logout(): void {
    this.afAuth
      .signOut()
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, catchError, of, Observable, from, take } from 'rxjs';
import { User, UsersService } from './users.service';
import { Store } from '@ngrx/store'
import { UserReceived } from 'src/app/ngrx/user.action';
import { FileUpload } from 'src/app/models/file-upload.model';
import { FilesService } from './files.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user$: Observable<firebase.default.User | null> = this.afAuth.user;

  constructor(public afAuth: AngularFireAuth, private usersService: UsersService, 
    private _store: Store, private filesService: FilesService) { }

  async SignUp(email: string, password: string, username: string, file: FileUpload | null) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        const userId = <string>result.user?.uid
        const user: User = { email, username, userId, avatar: '' }
        this.usersService.createUser(user)
        file && this.filesService.uploadFile(file, user)
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignIn(email: string, password: string): void {
    from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((res) => {
        if (res.user) {
          this.usersService.getUserInfoById(res.user?.uid).subscribe((users) => {
            this._store.dispatch(UserReceived({ user: users[0] }))
          })
        }
        return !!res.user;
      }),
      catchError(() => of(false)),
      take(1),
    ).subscribe();
  }
}

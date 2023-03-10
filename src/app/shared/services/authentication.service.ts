import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, catchError, of, Observable, from } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user$: Observable<firebase.default.User | null> = this.afAuth.user;

  constructor(public afAuth: AngularFireAuth, private usersService: UsersService) {}

  async SignUp(email: string, password: string, username: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        const userId = <string>result.user?.uid
        this.usersService.createUser({ email, username, userId, avatar: '' })
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async SignIn(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((res) => {
        return !!res.user;
      }),
      catchError(() => of(false))
    );
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, catchError, of, Observable, from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user$: Observable<firebase.default.User | null> = this.afAuth.user;

  constructor(public afAuth: AngularFireAuth) {}

  async SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        console.log(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async SignIn(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((res) => {
        console.log(res.user);
        return !!res.user;
      }),
      catchError(() => of(false))
    );
  }

  //const getUser() {
  //  return ()
  //}
}

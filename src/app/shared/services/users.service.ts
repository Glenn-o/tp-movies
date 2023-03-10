import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { from, Observable } from "rxjs";

export interface User { 
  username: string;
  email: string;
  userId: string;
  avatar: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private readonly af: AngularFirestore) {}

  createUser (user: User): void {
    from(this.af.collection<User>('users').add({ ...user }))
  }

  getUserInfoById (userId: string): Observable<User[]> {
    return this.af.collection<User>('users', ref => ref.where('userId', '==', userId).limit(1)).valueChanges()
  }
}
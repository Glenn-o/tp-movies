import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';

export interface User {
  username: string;
  email: string;
  userId: string;
  avatar: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private readonly db: AngularFirestore) {}

  createUser(user: User): void {
    from(
      this.db
        .collection<User>('users')
        .doc(user.userId)
        .set({ ...user }),
    );
  }

  getUserInfoById(userId: string): Observable<User[]> {
    return this.db
      .collection<User>('users', (ref) =>
        ref.where('userId', '==', userId).limit(1),
      )
      .valueChanges();
  }

  updateUser(user: User): void {
    from(
      this.db
        .collection<User>('users')
        .doc(user.userId)
        .update({ ...user }),
    );
  }
}

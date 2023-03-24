import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Like } from 'src/types/Movies';


@Injectable({ providedIn: 'root' })
export class LikesService {
    constructor(private readonly db: AngularFirestore) { }

    likeMovie(like: Like): Observable<any> {
        return from(
            this.db
                .collection<Like>('likes')
                .doc(`${like.movieId}${like.userId}`)
                .set({ ...like }),
        );
    }

    unlikeMovie(movieId: number, userId: string): Observable<any> {
        return from(
            this.db.collection<Like>('likes').doc(`${movieId}${userId}`).delete()
        )
    }

    getLikesByUserId(userId: string): Observable<Like[]> {
        return this.db.collection<Like>('likes', ref => ref.where('userId', '==', userId)).valueChanges();
    }

    getNewLikes(date: Date): Observable<Like[]> {
        return this.db.collection<Like>('likes', ref => ref.where('createdAt', '>=', date)).valueChanges();
    }
}
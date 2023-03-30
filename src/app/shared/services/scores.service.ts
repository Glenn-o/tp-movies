import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Score } from 'src/types/Movies';


@Injectable({ providedIn: 'root' })
export class ScoresService {
    constructor(private readonly db: AngularFirestore) { }

    scoreMovie(score: Score): Observable<any> {
        return from(
            this.db
                .collection<Score>('scores')
                .doc(`${score.movieId}${score.userId}`)
                .set({ ...score }),
        );
    }

    updateScore(score: Score): Observable<any> {
        return from(
            this.db
                .collection<Score>('scores')
                .doc(`${score.movieId}${score.userId}`)
                .update({ ...score }),
        );
    }

    getScoreByUserId(userId: string, movieId: string): Observable<Score | undefined> {
        return this.db.collection<Score>('scores').doc(`${movieId}${userId}`).valueChanges();
    }
}
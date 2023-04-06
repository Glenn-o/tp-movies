import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
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

    getNewScores(date: Date): Observable<Score[]> {
        return this.db.collection<Score>('scores', ref => ref.where('createdAt', '>=', date)).valueChanges();
    }

    getScoreByUserId(userId: string, movieId: string): Observable<Score | undefined> {
        return this.db.collection<Score>('scores').doc(`${movieId}${userId}`).valueChanges();
    }

    getLatestScore(): Observable<Score | undefined> {
        return this.db.collection<Score>('scores', ref => ref.orderBy('createdAt', 'desc').limit(1)).valueChanges().pipe(map(scores => scores[0]));
    }
}
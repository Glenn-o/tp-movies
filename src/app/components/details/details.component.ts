import { AsyncPipe, NgFor, NgIf, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, take } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { User } from 'src/app/shared/services/users.service';
import { Casts } from 'src/types/Casts';
import { MovieDetails } from 'src/types/MovieDetails';
import { Score } from 'src/types/Movies';
import { Store } from '@ngrx/store';
import { selectUserInfo } from 'src/app/ngrx/user/user.reducer';
import { ScoresService } from 'src/app/shared/services/scores.service';

@Component({
  selector: 'tp-movies-details',
  standalone: true,
  templateUrl: 'details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [AsyncPipe, NgIf, NgFor, CommonModule],
})
export class DetailsComponent implements OnInit {
  id = '';
  movie$: Observable<MovieDetails | null> | null = null;
  casts$: Observable<Casts> | null = null;
  user: User | null = null;
  score: Score | undefined = undefined;
  movieTitle = '';

  constructor(
    private readonly apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly store: Store<User>,
    private readonly scoresService: ScoresService,
  ) {}


  ngOnInit(): void {
    this.id = <string>this.route.snapshot.paramMap.get('id');
    this.movieTitle = <string>this.route.snapshot.paramMap.get('title');
    this.movie$ = this.apiService.getMovieById(this.id).pipe(catchError(() => {
      this.router.navigate(['/404'])
      return of(null)
    }));
    this.casts$ = this.apiService.getCastByMovieId(this.id);
    this.store.select(selectUserInfo).subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.scoresService.getScoreByUserId(this.user.userId, this.id).subscribe((score: Score | undefined) => {
          this.score = score
        }, take(1))
      }
    });
  }

  scoreMovie(score: number) {
    if (this.user !== null && this.score === undefined) 
    {
      const newScore: Score = {
        movieTitle: this.movieTitle,
        movieId: this.id,
        userId: this.user.userId,
        createdAt: new Date(),
        username: this.user.username,
        score: score
      }
      this.scoresService.scoreMovie(newScore).subscribe(() =>  {
        this.score = newScore
      }, take(1));
    }
    if (this.user !== null && this.score !== undefined) 
    {
      const newScore: Score = {
        movieTitle: this.movieTitle,
        movieId: this.id,
        userId: this.user.userId,
        createdAt: new Date(),
        username: this.user.username,
        score: score
      }
      this.scoresService.updateScore(newScore).subscribe(() =>  {
        this.score = newScore
      }, take(1));
    }
  }

  
}

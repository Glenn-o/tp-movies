import { AsyncPipe, NgFor, NgIf, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, combineLatest, take, map } from 'rxjs';
import { MoviesReceived } from 'src/app/ngrx/movies/movies.action';
import { selectUserInfo } from 'src/app/ngrx/user/user.reducer';
import { ApiService } from 'src/app/shared/services/api.service';
import { LikesService } from 'src/app/shared/services/likes.service';
import { User } from 'src/app/shared/services/users.service';
import { Like, Movie, Trending, Score } from 'src/types/Movies';
import { ScoresService } from 'src/app/shared/services/scores.service';


@Component({
  imports: [NgFor, NgIf, AsyncPipe, RouterLink, NgClass],
  selector: 'tp-movies-home',
  standalone: true,
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

  arrivalTime: Date = new Date();
  newLikes$ = combineLatest([this.likesService.getNewLikes(this.arrivalTime), this.scoreService.getNewScores(this.arrivalTime)]).pipe(map(([newLikes, newScores]) => ({ newLikes, newScores})))
  likes: Like[] = [];
  newScores$ = this.scoreService.getNewScores(this.arrivalTime);
  notificationVisible = false;
  isSidebarOpen = false;
  id$ = this.route.queryParams;
  page = 1;
  movies$: Observable<Trending> | null = null;
  user: User | null = null;
  latestScore: Score | undefined;

  ngOnInit(): void {
    this.store.select(selectUserInfo).subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.likesService.getLikesByUserId(this.user.userId).subscribe((likes: Like[]) => {
          this.likes = likes
        }, take(1))
      }
    });
    this.arrivalTime = new Date();
    this.scoreService.getLatestScore(this.arrivalTime).subscribe((score: Score | undefined) => {
      this.latestScore = score;
    }, take(1));
    this.newScores$.subscribe(() => {
      this.scoreService.getLatestScore(this.arrivalTime).subscribe((score: Score | undefined) => {
        if(score && score !== this.latestScore) {
          this.latestScore = score;
          if (this.latestScore.score > 3 && !this.isSidebarOpen) {
          this.notificationVisible = true;
          this.cd.detectChanges();
          setTimeout(() => {
            this.notificationVisible = false;
            this.cd.detectChanges();
          }, 7000);
        }
        }
      }, take(1));
    });
  }

  likeMovie(movie: Movie) {
    if (this.user !== null) {
      const newLike: Like = {
        movieId: movie.id,
        movieTitle: movie.title,
        userId: this.user.userId,
        username: this.user.username,
        createdAt: new Date(),
      }
      this.likesService.likeMovie(newLike).subscribe(() => {
        this.likes.push(newLike)
      }, take(1));
    }
  }

  unlikeMovie(movie: Movie) {
    if (this.user !== null) {
      this.likesService.unlikeMovie(movie.id, this.user.userId).subscribe(() => {
        this.likes = this.likes.filter(like => like.movieId !== movie.id);
      }, take(1));
    }
  }

  isLiked(movie: Movie) {
    return this.likes.some(like => like.movieId === movie.id && like.userId === this.user?.userId);
  }

  toggleSidebar() {
    if (!this.isSidebarOpen) {
      this.notificationVisible = false;
    }
    this.isSidebarOpen = !this.isSidebarOpen;
    const sidebar = document.querySelector('.sidebar');
    if (this.isSidebarOpen) {
      this.renderer.addClass(sidebar, 'open');
    } else {
      this.renderer.removeClass(sidebar, 'open');
    }
  }

  getMovies(page: number = 1) {
    if (page) {
      this.movies$ = this.apiService.getTrendingMovies(page).pipe(
        map((movies: Trending) => {
          this.store.dispatch(MoviesReceived({ movies: movies }))
          return movies
        }),
        catchError(() => {
          this.page = 1;
          return this.apiService.getTrendingMovies(1);
        }),
      );
    } else {
      this.movies$ = this.apiService.getTrendingMovies(page);
    }
  }

  constructor(
    private readonly apiService: ApiService,
    private readonly renderer: Renderer2,
    private readonly likesService: LikesService,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly scoreService: ScoresService,
    private cd: ChangeDetectorRef,
  ) {
    this.id$.subscribe((page) => {
      this.page = Number(page['page']) || 1
      this.getMovies(Number(this.page))
    }, take(1));
  }
}

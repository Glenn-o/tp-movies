import { AsyncPipe, NgFor, NgIf, NgIfContext } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, Observable, take } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Trending } from 'src/types/Movies';

@Component({
  imports: [NgFor, NgIf, AsyncPipe, RouterLink],
  selector: 'tp-movies-home',
  standalone: true,
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  id$ = this.route.queryParams;
  page = 1;
  movies$: Observable<Trending> | null = null;

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
  ) {
    this.id$.subscribe((page) => {
      this.page = Number(page['page']) || 1
      this.getMovies(Number(this.page))
    }, take(1));
  }

  getMovies(page: number = 1) {
    if (page) {
      this.movies$ = this.apiService.getTrendingMovies(page).pipe(
        catchError(() => {
          page = 1;
          return this.apiService.getTrendingMovies(1);
        }),
      );
    } else {
      this.movies$ = this.apiService.getTrendingMovies(page);
    }
  }
}

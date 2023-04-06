import { AsyncPipe, NgFor, NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Trending } from 'src/types/Movies';

@Component({
  imports: [NgFor, NgIf, AsyncPipe, RouterLink, NgClass],
  selector: 'tp-movies-search',
  standalone: true,
  styleUrls: ['../home/home.component.scss', 'search.component.scss'],
  templateUrl: 'search.component.html',
})
export class SearchComponent {
  id$ = this.route.queryParams;
  page = 1;
  movies$: Observable<Trending | null> | null = null;
  query: string | null = null;

  getSearchResult(query: string) {
    query = query.trim();
    this.query = query;
    this.page = 1;
    if (query.length) {
      this.router.navigate(['/search'], { queryParams: { query, page: 1 } });
    }
  }

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.id$.subscribe((queryParams) => {
      let { query, page } = queryParams;
      page = Number(page) || 1;
      query = query && query.trim();
      if (page && query?.length) {
        this.page = page;
        this.query = query;
        this.movies$ = this.apiService
          .search(<string>this.query, this.page)
          .pipe(
            map((movies) => {
              if (!movies.results.length) this.router.navigate(['/404']);

              return movies;
            }),
          );
      }
    }, take(1));
  }
}

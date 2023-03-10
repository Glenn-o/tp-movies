import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trending } from 'src/types/Movies';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getTrendingMovies(): Observable<Trending> {
    return this.httpClient.get<Trending>(
      'https://api.themoviedb.org/3/trending/movie/week?api_key=498202a6bb5540555f8ae398a434f702'
    );
  }
}

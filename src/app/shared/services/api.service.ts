import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Casts } from 'src/types/Casts';
import { MovieDetails } from 'src/types/MovieDetails';
import { Trending } from 'src/types/Movies';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public getTrendingMovies(page: number): Observable<Trending> {
    return this.httpClient.get<Trending>(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=498202a6bb5540555f8ae398a434f702&page=${page}`,
    );
  }

  public getMovieById(id: string): Observable<MovieDetails> {
    return this.httpClient.get<MovieDetails>(
      `https://api.themoviedb.org/3/movie/${id}?api_key=498202a6bb5540555f8ae398a434f702`,
    );
  }

  public getCastByMovieId(id: string): Observable<Casts> {
    return this.httpClient.get<Casts>(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=498202a6bb5540555f8ae398a434f702`,
    );
  }
}

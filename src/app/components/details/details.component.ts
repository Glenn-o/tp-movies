import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Casts } from 'src/types/Casts';
import { MovieDetails } from 'src/types/MovieDetails';

@Component({
  selector: 'tp-movies-details',
  standalone: true,
  templateUrl: 'details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [AsyncPipe, NgIf, NgFor],
})
export class DetailsComponent implements OnInit {
  id = '';
  movie$: Observable<MovieDetails | null> | null = null;
  casts$: Observable<Casts> | null = null;

  constructor(
    private readonly apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id = <string>this.route.snapshot.paramMap.get('id');
    this.movie$ = this.apiService.getMovieById(this.id).pipe(catchError(() => {
      this.router.navigate(['/404'])
      return of(null)
    }));
    this.casts$ = this.apiService.getCastByMovieId(this.id);
  }
}

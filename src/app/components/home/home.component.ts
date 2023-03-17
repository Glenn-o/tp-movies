import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  imports: [NgFor, NgIf, AsyncPipe, RouterLink],
  selector: 'tp-movies-home',
  standalone: true,
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  movies$ = this.apiService.getTrendingMovies();

  constructor(private readonly apiService: ApiService) {}
}

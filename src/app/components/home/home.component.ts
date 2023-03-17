import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Movie } from 'src/types/Movies';

@Component({
  imports: [NgFor, NgIf, AsyncPipe],
  selector: 'tp-movies-home',
  standalone: true,
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  movies$ = this.apiService.getTrendingMovies();
  likedMovies: Movie[] = [];
  isSidebarOpen = false;

  likeMovie(movie: Movie) {
    const index = this.likedMovies.findIndex(m => m.id === movie.id);
    if (index === -1) {
      this.likedMovies.push(movie);
    } else {
      this.likedMovies.splice(index, 1);
    }
  }




  openSidebar() {
    this.isSidebarOpen = true;
    const sidebar = document.querySelector('.sidebar');
    this.renderer.addClass(sidebar, 'open');
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    const sidebar = document.querySelector('.sidebar');
    this.renderer.removeClass(sidebar, 'open');
  }

  constructor(
    private readonly apiService: ApiService,
    private readonly renderer: Renderer2
  ) {}
}

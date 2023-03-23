import { AsyncPipe, NgFor, NgIf, NgClass  } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Like, Movie } from 'src/types/Movies';

@Component({
  imports: [NgFor, NgIf, AsyncPipe, RouterLink, NgClass],
  selector: 'tp-movies-home',
  standalone: true,
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  movies$ = this.apiService.getTrendingMovies();
  likes: Like[] = [];
  isSidebarOpen = false;

  likeMovie(movie: Movie) {
    const index = this.likes.findIndex(like => like.movieId === movie.id && like.userId === '1');
    if (index === -1) {
      const newLike: Like = {
        movieId: movie.id,
        movieTitle: movie.original_title,
        userId: '1',
        username: 'test'
      }
      this.likes.push(newLike);
    } else {
      this.likes.splice(index, 1);
    }
  }

  isLiked(movie: Movie): boolean {
    return this.likes.some(like => like.movieId === movie.id && like.userId === '1');
  }


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const sidebar = document.querySelector('.sidebar');
    if(this.isSidebarOpen) {
      this.renderer.addClass(sidebar, 'open');
    } else {
      this.renderer.removeClass(sidebar, 'open');
    }
  }

  constructor(
    private readonly apiService: ApiService,
    private readonly renderer: Renderer2
  ) {}
}

import { AsyncPipe, NgFor, NgIf, NgClass } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { LikesService } from 'src/app/shared/services/likes.service';
import { Like, Movie } from 'src/types/Movies';

@Component({
  imports: [NgFor, NgIf, AsyncPipe, RouterLink, NgClass],
  selector: 'tp-movies-home',
  standalone: true,
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  
  arrivalTime: Date = new Date();
  movies$ = this.apiService.getTrendingMovies();
  newLikes$ = this.likesService.getNewLikes(this.arrivalTime);
  likes: Like[] = [];
  isSidebarOpen = false;



  ngOnInit(): void {
    this.likesService.getLikesByUserId('1').subscribe((likes: Like[]) => {
      this.likes = likes
    }, take(1))
    this.arrivalTime = new Date();
  }

  likeMovie(movie: Movie) {
      const newLike: Like = {
        movieId: movie.id,
        movieTitle: movie.original_title,
        userId: '1',
        username: 'test',
        createdAt: new Date(),
      }
      this.likesService.likeMovie(newLike).subscribe(() =>  {
        this.likes.push(newLike)
      }, take(1));
  }

  unlikeMovie(movie: Movie) {
    this.likesService.unlikeMovie(movie.id, "1").subscribe(() => {
      this.likes = this.likes.filter(like => like.movieId !== movie.id);
    }, take(1));
  }

  isLiked(movie: Movie): boolean {
    return this.likes.some(like => like.movieId === movie.id && like.userId === '1');
  }

  // getLAllLikes() {
  //   this.likesService.getAllLikes().subscribe((likes: Like[]) => {
  //     return likes;
  //   }, take(1));
  // }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const sidebar = document.querySelector('.sidebar');
    if (this.isSidebarOpen) {
      this.renderer.addClass(sidebar, 'open');
    } else {
      this.renderer.removeClass(sidebar, 'open');
    }
  }

  constructor(
    private readonly apiService: ApiService,
    private readonly renderer: Renderer2,
    private readonly likesService: LikesService,
  ) { }
}

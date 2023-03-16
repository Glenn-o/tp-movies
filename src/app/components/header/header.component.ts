import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [NgIf, RouterLink],
  selector: 'tp-movies-header',
  standalone: true,
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  user = {
    username: 'username',
  };
}

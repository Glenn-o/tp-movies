import { Component } from '@angular/core';

@Component({
  selector: 'tp-movies-404',
  standalone: true,
  template: `
    <div>
      <h1>4<span>0</span>4</h1>
      <p>PAGE NOT FOUND AHAHAH Try an other routes !</p>
    </div>
  `,
  styleUrls: ['./404.component.scss'],
})
export class NotFoundComponent {}

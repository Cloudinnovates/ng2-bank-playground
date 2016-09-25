import { Component } from '@angular/core';
import { AuthService } from '../../auth';


@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>

    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `
})

export class AppComponent {
  constructor(private auth: AuthService) {}
}

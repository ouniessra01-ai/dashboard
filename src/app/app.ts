import { Component, signal } from '@angular/core';
import { Dashboard } from './dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [Dashboard],
  template: '<app-dashboard></app-dashboard>',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('road-tracking-dashboard');
}

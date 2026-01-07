import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-widget',
  imports: [CommonModule],
  templateUrl: './stats-widget.html',
  styleUrl: './stats-widget.scss',
})
export class StatsWidget {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() icon: string = '';
  @Input() color: string = '';
  @Input() image: string = '';
}

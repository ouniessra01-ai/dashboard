import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-route-card',
  imports: [],
  templateUrl: './route-card.html',
  styleUrl: './route-card.scss',
})
export class RouteCard {
  @Input() expeditionNumber: string = '';
  @Input() fromAddress: string = '';
  @Input() toAddress: string = '';
  @Input() materialType: string = '';
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsWidget } from '../stats-widget/stats-widget';
import { RouteCard } from '../route-card/route-card';
import { MapCard } from '../map-card/map-card';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, StatsWidget, RouteCard, MapCard],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'], 
})
export class DashboardComponent {
  stats = [
    { label: 'Véhicules', value: '13', image: 'Vector.svg' },
    { label: 'Temps d\'Attente', value: '15 min', image: 'time.svg' },
    { label: 'Quais', value: '7', image: 'dock.svg' },
    { label: 'Vérifications', value: '45', image: 'Verification.svg' }
  ];

  route = {
    expeditionNumber: 'EV-2017003323',
    fromAddress: '2972 Westheimer Rue d\'Origine',
    toAddress: '8502 Preston Avenue de Destination',
    materialType: 'Matieres alimentaires'
  };
}
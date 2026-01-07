import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsWidget } from '../stats-widget/stats-widget';
import { RouteCard } from '../route-card/route-card';
import { MapCard } from '../map-card/map-card';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, StatsWidget, RouteCard, MapCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  stats = [
    { label: 'Véhicules', value: '150', icon: 'fas fa-truck', image: 'Vector.svg' },
    { label: 'Temps d\'Attente', value: '5 min', icon: 'fas fa-clock', image: 'time.svg' },
    { label: 'Quais', value: '12', icon: 'fas fa-warehouse', image: 'dock.svg' },
    { label: 'Vérifications', value: '89%', icon: 'fas fa-check-circle', image: 'Verification.svg' }
  ];

  route = {
    expeditionNumber: 'EV-2017003323',
    fromAddress: '2972 Westheimer Rue d\'Origine',
    toAddress: '8502 Preston Avenue de Destination',
    materialType: 'Matieres alimentaires'
  };
}

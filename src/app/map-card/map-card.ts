import { Component, AfterViewInit, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.html',
  styleUrls: ['./map-card.scss']
})
export class MapCard implements AfterViewInit {
  @Input() fromAddress!: string;
  @Input() toAddress!: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const mapElement = document.getElementById('leaflet-map');
    if (!mapElement) return;

    const map = L.map(mapElement).setView([29.7373, -95.4339], 6); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    
    const startIcon = L.icon({
      iconUrl: 'assets/images/start.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    const arrivalIcon = L.icon({
      iconUrl: 'assets/icons/arraival.svg', 
      iconSize: [30, 30],
      iconAnchor: [10, 10]
    });

    
    const startCoords: [number, number] = [29.7373, -95.4339];  
    const endCoords: [number, number] = [32.8675, -96.8011];    

    
    L.marker(startCoords, { icon: startIcon }).addTo(map).bindPopup(`Start: ${this.fromAddress}`);
    L.marker(endCoords, { icon: arrivalIcon }).addTo(map).bindPopup(`Arrival: ${this.toAddress}`);

    
    const routeLine = L.polyline([startCoords, endCoords], {
      color: 'yellow',
      weight: 4,
      opacity: 0.8
    }).addTo(map);

    map.fitBounds(routeLine.getBounds());
  }
}
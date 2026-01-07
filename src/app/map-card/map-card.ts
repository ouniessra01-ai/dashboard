import { Component, Input, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.html',
  styleUrls: ['./map-card.scss']
})
export class MapCard implements AfterViewInit {
  @Input() fromAddress = '';
  @Input() toAddress = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const mapElement = document.getElementById('leaflet-map');
    if (!mapElement) {
      console.error('Map element not found');
      return;
    }

    const map = L.map(mapElement).setView([48.8566, 2.3522], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

  
    const startIcon = L.icon({
      iconUrl: 'assets/images/start.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    const endIcon = L.icon({
      iconUrl: 'assets/images/direction.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    const arrowIcon = L.icon({
      iconUrl: 'assets/images/location.svg',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });


  
    const startCoords: [number, number] = [29.742200, -95.422201];
    const endCoords: [number, number] = [40.908174, -81.268990];

   
    L.marker(startCoords, { icon: startIcon }).addTo(map);
    L.marker(endCoords, { icon: endIcon }).addTo(map);

   
    const routeLine = L.polyline([startCoords, endCoords], {
      color: '#FFC700',
      weight: 5,
      opacity: 0.9
    }).addTo(map);

    
    const midLat = (startCoords[0] + endCoords[0]) / 2;
    const midLng = (startCoords[1] + endCoords[1]) / 2;
    L.marker([midLat, midLng], { icon: arrowIcon }).addTo(map);

   
    map.fitBounds(routeLine.getBounds());
    map.invalidateSize();
  }
}
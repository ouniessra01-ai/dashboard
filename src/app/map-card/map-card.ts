import { Component, AfterViewInit, Inject, PLATFORM_ID, Input, HostListener } from '@angular/core';
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

  private map!: L.Map;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const mapElement = document.getElementById('leaflet-map');
    if (!mapElement) return;

    this.map = L.map(mapElement).setView([29.7373, -95.4339], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributeurs'
    }).addTo(this.map);

    const fromCoords: [number, number] = [29.7604, -95.3698];
    const toCoords: [number, number] = [30.2672, -97.7431];

    const startIcon = L.icon({
      iconUrl: 'assets/images/start.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    const arrivalIcon = L.icon({
      iconUrl: 'assets/icons/arraival.svg',
      iconSize: [30, 30],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });

    L.marker(fromCoords, { icon: startIcon }).addTo(this.map).bindPopup("Point de départ : 2972 Westheimer");
    L.marker(toCoords, { icon: arrivalIcon }).addTo(this.map).bindPopup("Point d’arrivée : 8502 Preston");

    const routeLine = L.polyline([fromCoords, toCoords], { color: '#FFF9C4', weight: 4 }).addTo(this.map);

    this.map.fitBounds(routeLine.getBounds());

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  @HostListener('window:resize')
  onResize() {
    if (this.map) {
      this.map.invalidateSize();
    }
  }
}
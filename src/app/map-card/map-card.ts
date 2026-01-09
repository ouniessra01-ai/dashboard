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
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);


   
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
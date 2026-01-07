import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCard } from './map-card';

describe('MapCard', () => {
  let component: MapCard;
  let fixture: ComponentFixture<MapCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
const map = L.map('leaflet-map').setView([48.8566, 2.3522], 13);


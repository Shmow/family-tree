import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LeafletMapService } from '../../../services/leaflet-map.service';

@Component({
  selector: 'app-leaflet-map',
  imports: [],
  providers: [],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss'
})
export class LeafletMapComponent implements OnInit, AfterViewInit {
  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.flyTo([52.155170, 5.387200], 8)
  }

  constructor(private leafletMapService: LeafletMapService) { }
  
  ngOnInit(): void {
    let DefaultIcon = L.icon({
      iconUrl: `assets/marker-icon.png`,
      shadowUrl: `assets/marker-shadow.png`,
      iconSize: [24, 36],
      iconAnchor: [12, 36]
    });

    L.Marker.prototype.options.icon = DefaultIcon;
  }

  ngAfterViewInit(): void {
    this.initMap();

    this.leafletMapService.pins.subscribe((latlon) => {
      L.marker(latlon).addTo(this.map);
    })
  }
}

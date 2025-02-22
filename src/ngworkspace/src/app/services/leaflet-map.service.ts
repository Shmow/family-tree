import { Injectable } from '@angular/core';
import { GeolocationLookupService } from './geolocation-lookup.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeafletMapService {
  pins = new Subject<[number, number]>();

  constructor(private geoLookup: GeolocationLookupService) { }

  getGeoAndDropPin(city: string) {
    this.geoLookup.getGeoLocation(city).subscribe(resp => {
      let lat;
      let lon;
      if (resp.lat) {
        lat = parseFloat(resp.lat)
      }

      if (resp.lon) {
        lon = parseFloat(resp.lon)
      }

      if (lat && lon) {
        this.pins.next([lat, lon]);
      }
    })
  }
}

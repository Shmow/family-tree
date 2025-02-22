import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GeolocationLookupResponse } from './geolocation-lookup-response.model';

@Injectable({
  providedIn: 'root'
})
export class GeolocationLookupService {
  private nominatimApiUrl = 'https://nominatim.openstreetmap.org'
  private nominatimSearchApiUrl = `${this.nominatimApiUrl}/search`;

  private headers = {
    'Access-Control-Allow-Origin': this.nominatimApiUrl,
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent'
  }

  constructor(private httpClient: HttpClient) { }

  getGeoLocation(city: string): Observable<GeolocationLookupResponse> {
    const params: any = { city, format: "jsonv2" };
    return this.httpClient.get<GeolocationLookupResponse[]>(this.nominatimSearchApiUrl, { params, headers: this.headers })
      .pipe(map((response: GeolocationLookupResponse[]) => {
        let max = response.reduce(this.maxImportance());
        return max;
      }));
  }

  private maxImportance(): (previousValue: GeolocationLookupResponse, currentValue: GeolocationLookupResponse, currentIndex: number, array: GeolocationLookupResponse[]) => GeolocationLookupResponse {
    return (prev, current) => (prev && prev.importance! > current.importance!) ? prev : current;
  }
}


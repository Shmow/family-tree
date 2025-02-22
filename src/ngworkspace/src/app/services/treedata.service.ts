import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreeDataService {

  constructor(private readonly httpClient: HttpClient) { }

  getTreeData() {
    return this.httpClient.get('api/persons/?format=json');
  }
}

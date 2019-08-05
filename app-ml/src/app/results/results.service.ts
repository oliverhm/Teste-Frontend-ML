import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ResultsService {
  constructor(private httpClient: HttpClient) {}

  getItemsByQuery(query: string): Observable<any> {
    const params = new HttpParams().append('q', query);
    return this.httpClient.get('http://localhost:3000/api/items', { params });
  }
}

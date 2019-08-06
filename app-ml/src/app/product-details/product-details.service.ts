import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductDetailsService {
  constructor(private httpClient: HttpClient) {}

  getItemById(id: string): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/api/items/${id}`);
  }
}

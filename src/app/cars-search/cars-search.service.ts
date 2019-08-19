import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsSearchService {

  private apiKey = '4MhHmkWSVc1tdOYdKcrlx0ZDYVxI4eN67I6D5Yok';
  constructor(public http: HttpClient) { }

  getType(): Observable<any> {
    return this.http.get(`https://developers.ria.com/auto/categories/1/bodystyles?api_key=${this.apiKey}`)
  }

  getFuel(): Observable<any> {
    return this.http.get(`https://developers.ria.com/auto/type?api_key=${this.apiKey}`);
  }

  getBrand(): Observable<any> {
    return this.http.get(`https://developers.ria.com/auto/categories/1/marks?api_key=${this.apiKey}`)
  }

  getModel(selectedBrand: number): Observable<any> {
    return this.http.get(`https://developers.ria.com/auto/categories/1/marks/${selectedBrand}/models?api_key=${this.apiKey}`)
  }


}

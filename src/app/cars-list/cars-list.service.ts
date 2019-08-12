import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsListService {

  private apiKey: string = '4MhHmkWSVc1tdOYdKcrlx0ZDYVxI4eN67I6D5Yok';

  constructor(private http: HttpClient) {
  }

  getAveragePrice(searchParams: { [key: string]: any }){
    return this.http.get(`https://developers.ria.com/auto/average_price?api_key=${this.apiKey}&bodystyle=${searchParams.type}&marka_id=${searchParams.brand}&model_id=${searchParams.model}&yers=${searchParams.year}&fuel_id=${searchParams.fuel}`)
  }

  loadSiblingsCars(averagePriceIndex: number, priceMap: []){
    let obsevableList: Observable<any>[] = [];
    for (let i = averagePriceIndex - 5; i <= averagePriceIndex + 6; i++) {
      if (priceMap[i]) {
        let observableItem = this.http.get(`https://developers.ria.com/auto/info?api_key=${this.apiKey}&auto_id=${priceMap[i][1]}`)
        obsevableList.push(observableItem);
      }
    }
    return forkJoin(obsevableList)
  }

}

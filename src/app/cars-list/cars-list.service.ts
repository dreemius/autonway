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

  getAveragePrice(searchParams: { [key: string]: any }): Observable<any> {
    return this.http.get(`https://developers.ria.com/auto/average_price?api_key=${this.apiKey}&custom=${searchParams.custom}&bodystyle=${searchParams.type}&marka_id=${searchParams.brand}&model_id=${searchParams.model}&yers=${searchParams.year}&fuel_id=${searchParams.fuel}`) //
  }

  // loadCarsInfo(averagePriceIndex: number, priceMap: [], carsToLoadCount: number): Observable<any> {
  //   let obsevableList: Observable<any>[] = [];
  //   if (priceMap.length <= carsToLoadCount) {
  //     priceMap.forEach(item=>{
  //       let observableItem = this.http.get(`https://developers.ria.com/auto/info?api_key=${this.apiKey}&auto_id=${item[1]}`)
  //       obsevableList.push(observableItem);
  //     })
  //   } else {
  //     for (let i = averagePriceIndex - (carsToLoadCount/2); i <= averagePriceIndex + (carsToLoadCount/2); i++) {
  //       if (priceMap[i]) {
  //         let observableItem = this.http.get(`https://developers.ria.com/auto/info?api_key=${this.apiKey}&auto_id=${priceMap[i][1]}`)
  //         obsevableList.push(observableItem);
  //       }
  //     }
  //   }
  //   return forkJoin(obsevableList)
  // }

  loadCarsInfo(averagePriceIndex: number, priceMap: any[], carsToLoadCount: number): Observable<any> {
    return (priceMap.length <= carsToLoadCount) ?
      forkJoin(this.loadAllCars(priceMap)) :
      forkJoin(this.loadSiblingsCars(priceMap, averagePriceIndex, carsToLoadCount))
  }

  loadAllCars(priceMap: any[]): Observable<any>[] {
    return priceMap.map(item => {
      return this.http.get(`https://developers.ria.com/auto/info?api_key=${this.apiKey}&auto_id=${item[1]}`)
    })
  }

  loadSiblingsCars(priceMap: any[], averagePriceIndex: number, carsToLoadCount: number): Observable<any>[] {
    let obsevableList: Observable<any>[] = [];
    for (let i = averagePriceIndex - (carsToLoadCount / 2); i < averagePriceIndex + (carsToLoadCount / 2); i++) {
      if (priceMap[i]) {
        let observableItem = this.http.get(`https://developers.ria.com/auto/info?api_key=${this.apiKey}&auto_id=${priceMap[i][1]}`)
        obsevableList.push(observableItem);
      }
    }
    return obsevableList;
  }

  loadCheapestPrice(idsList: number[]): Observable<any> {
    let obsevableList: Observable<any>[] = [];
    obsevableList = idsList.map(item => {
      return this.http.get(`https://developers.ria.com/auto/info?api_key=${this.apiKey}&auto_id=${item}`)
    })
    return forkJoin(obsevableList);
  }

}

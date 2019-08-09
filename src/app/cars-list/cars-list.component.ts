import { Component, OnInit } from '@angular/core';
import { CarsService } from './cars.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
  private apiKey: string = '4MhHmkWSVc1tdOYdKcrlx0ZDYVxI4eN67I6D5Yok';
  private noResults: boolean = false;
  private resultData: { [key: string]: any };
  private rowResult: { [key: string]: any };
  private priceMap: [];

  constructor(
    private service: CarsService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  searchCars(searchParams: { [key: string]: any }): void {
    this.http.get(`https://developers.ria.com/auto/average_price?api_key=${this.apiKey}&bodystyle=${searchParams.type}&marka_id=${searchParams.brand}&model_id=${searchParams.model}&yers=${searchParams.year}&fuel_id=${searchParams.fuel}`).subscribe((result: any) => {
      if (!result || (result && result.total === 0)) {
        this.noResults = true;
        return;
      }
      this.setData(result);
      this.sortPrice();
      let meanIndex = this.findItemCloseToMean();
      this.loadSiblingsCars(meanIndex)
    })
  }

  setData(result: any) {
    this.resultData = {
      total: Math.round(result.total),
      arithmeticMean: Math.round(result.arithmeticMean),
      interQuartileMean: Math.round(result.interQuartileMean)
    }
    this.rowResult = result;
  }

  sortPrice(): void {
    this.priceMap = this.rowResult.prices.map((item: string, index: number) => {
      return [item, this.rowResult.classifieds[index]]
    })
    this.priceMap.sort((a: any, b: any) => { return a[0] - b[0] });
  }

  findItemCloseToMean(): number {
    let minDiff = Infinity;
    let priceIndex = 0;

    this.priceMap.forEach((item: any, index: any) => {
      const diff = Math.abs(item[0] - this.resultData.arithmeticMean);

      if (diff <= minDiff) {
        minDiff = diff;
        priceIndex = index;
      }
    })
    return priceIndex;
  }

  loadSiblingsCars(meanIndex: number) {

    for (let i = meanIndex - 5; i <= meanIndex + 5; i++) {
      console.log(this.priceMap[i])
    }

    // let id = this.rowResult.classifieds[10]
    // this.http.get(`https://developers.ria.com/auto/info?api_key=${this.apiKey}&auto_id=${id}`).subscribe(result => {
    //   console.log(result);
    // })
  }

}

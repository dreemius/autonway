import { Component, OnInit } from '@angular/core';
import { CarsListService } from './cars-list.service';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
  public carsToLoad = 50;
  public carsToDisplay = 14;

  public loading: boolean = false;
  public noResults: boolean = false;
  public resultValues: { [key: string]: any };
  public rowResult: { [key: string]: any };
  public priceMap: any[];
  public carsList: any[];
  public visibleCarsList: any[];
  public visibleCarsCount: number;
  public twoCheapestCar: any;
  public averageMileage: number;

  constructor(
    public carsListService: CarsListService,
  ) { }

  ngOnInit() {
  }

  searchCars(searchParams: { [key: string]: any }): void {
    this.showLoading();
    this.clearValues()
    this.carsListService.getAveragePrice(searchParams).subscribe((result: any) => {
      if (this.validateResult(result)) {
        this.setResultData(result);
        let priceMap = this.sortPrice();
        let closePriceIndex = this.findItemCloseToAverage(priceMap);

        this.loadCarsInfo(priceMap, closePriceIndex).subscribe((result: any) => {
          this.displayCars(closePriceIndex);
          this.displayCheapestCar(priceMap);
          this.calculateAverageMileage();
          this.hideLoading();
        });
      }
    })
  }

  validateResult(result: any): boolean {
    if (!result || (result && result.total === 0)) {
      this.noResults = true;
      this.hideLoading();
      return false;
    } else {
      this.noResults = false;
      return true;
    }
  }

  clearValues(): void {
    this.resultValues = {};
    this.rowResult = [];
    this.priceMap = [];
    this.carsList = [];
    this.visibleCarsList = [];
  }

  setResultData(result: any): void {
    this.resultValues = {
      total: Math.round(result.total),
      arithmeticMean: Math.round(result.arithmeticMean),
      interQuartileMean: Math.round(result.interQuartileMean)
    }
    this.rowResult = result;
  }

  sortPrice(): any[] {
    let priceMap = this.rowResult.prices.map((item: string, index: number) => {
      return [item, this.rowResult.classifieds[index]]
    })
    priceMap.sort((a: any, b: any) => { return a[0] - b[0] });
    return priceMap;
  }

  findItemCloseToAverage(priceMap: any[]): number {
    let minDiff = Infinity;
    let priceIndex = 0;

    priceMap.forEach((item: any, index: any) => {
      const diff = Math.abs(item[0] - this.resultValues
        .arithmeticMean);

      if (diff <= minDiff) {
        minDiff = diff;
        priceIndex = index;
      }
    })
    return priceIndex;
  }

  loadCarsInfo(priceMap: any[], averagePriceIndex: number): Observable<any> {
    return this.carsListService.loadCarsInfo(averagePriceIndex, priceMap, this.carsToLoad).pipe(tap(result => {
      this.carsList = result;
    }))
  }

  displayCars(averagePriceIndex: number): void {
    if (this.carsList.length <= this.carsToDisplay) {
      this.carsList.forEach(item => this.visibleCarsList.push(item))
    } else {
      for (let i = averagePriceIndex - (this.carsToDisplay / 2); i <= averagePriceIndex + (this.carsToDisplay / 2); i++) {
        this.carsList[i] && this.visibleCarsList.push(this.carsList[i]);
      }
    }
    this.visibleCarsCount = this.visibleCarsList.length;
  }

  calculateAverageMileage(): void {
    let sum = this.carsList.reduce((sum, item) => {
      let race = item.autoData.raceInt;
      return (race > 10 && race < 990) ? item.autoData.raceInt + sum : sum;
    }, 0);
    this.averageMileage = Math.floor(sum / this.carsList.length);
  }

  displayCheapestCar(priceMap: any[]) {
    let autoIdFirst = priceMap && priceMap[0][1];
    let autoIdSecond = priceMap && priceMap[1] && priceMap[1][1];
    
    let cheapestCarsList = this.carsList.filter(item => {
      return (item.autoData.autoId == autoIdFirst) || (item.autoData.autoId == autoIdSecond)
    });
    
    if (cheapestCarsList.length == 0) {
      this.carsListService.loadCheapestPrice([autoIdFirst,autoIdSecond]).subscribe(result => this.twoCheapestCar = result);
    } else {
      this.twoCheapestCar = cheapestCarsList;
    }
  }

  showLoading(){this.loading = true;}
  hideLoading(){this.loading = false;}

}

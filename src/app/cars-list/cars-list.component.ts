import { Component, OnInit } from '@angular/core';
import { CarsListService } from './cars-list.service';
import { HttpClient } from '@angular/common/http';
//import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
  public noResults: boolean = false;
  public resultData: { [key: string]: any };
  public rowResult: { [key: string]: any };
  public priceMap: [];
  public loadedCarsCount: number;
  carsList: any[];

  constructor(
    public carsListService: CarsListService,
  ) { }

  ngOnInit() {
  }

  searchCars(searchParams: { [key: string]: any }): void {
    this.clearValues()
    this.carsListService.getAveragePrice(searchParams).subscribe((result: any) => {
      this.validateResult(result);
      this.setData(result);
      this.sortPrice();
      this.loadSiblingsCars(this.findItemCloseToAverage());
    })
  }
  
  validateResult(result: any): boolean {
    if (!result || (result && result.total === 0)) {
      this.noResults = true;
      return false;
    } else {
      this.noResults = false;
      return true;
    }
  }

  clearValues(): void {
    this.resultData = {};
    this.rowResult = [];
    this.priceMap = [];
    this.carsList = [];
  }

  setData(result: any): void {
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

  findItemCloseToAverage(): number {
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

  loadSiblingsCars(averagePriceIndex: number): void {
    this.carsListService.loadSiblingsCars(averagePriceIndex, this.priceMap).subscribe(result => {
      this.loadedCarsCount = result.length;
      this.carsList = result;
    })
  }

}

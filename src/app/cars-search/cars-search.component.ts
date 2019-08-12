import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { CarsSearchService } from './cars-search.service';

@Component({
  selector: 'app-cars-search',
  templateUrl: './cars-search.component.html',
  styleUrls: ['./cars-search.component.css']
})
export class CarSearchComponent implements OnInit {
  @Output() search = new EventEmitter<any>();
  private type: any;
  private brand: any;
  private model: any
  private fuel: any

  selectedType: any;
  selectedBrand: any;
  selectedModel: any;
  selectedYear: any;
  selectedFuel: any;
  invalidYear: boolean = false;
  keyword = 'name';

  constructor(public carsSearchService: CarsSearchService) { }

  ngOnInit() {
    this.carsSearchService.getType().subscribe(result => {
      this.type = result;
      this.selectedType = this.type[0].value;
    })
    this.carsSearchService.getFuel().subscribe(result => {
      this.fuel = result;
      this.selectedFuel = this.fuel[0].value;
    })
    this.carsSearchService.getBrand().subscribe((result: any) => {
      this.brand = result;
    })
  }

  onBrandChanged(selectedBrand: any): void {
    this.selectedBrand = selectedBrand.value;
    this.carsSearchService.getModel(selectedBrand.value).subscribe((result: any) => {
      this.model = [{ name: "Выберите модель машины", value: 0 }, ...result];
      this.selectedModel = result[0].value;
    })
  }

  onSearch(searchForm: any): void {
    this.validateForm(searchForm) && this.search.emit(this.getSearchConfig());
  }

  validateForm(searchForm: any) {
    let year = Number(searchForm.form.value.year)
    if (!Number.isInteger(year) || (year < 1950 || year > 2025)) {
      this.invalidYear = true;
      return false;
    }
    this.invalidYear = false;
    return true;
  }

  getSearchConfig() {
    return {
      type: this.selectedType,
      brand: this.selectedBrand,
      model: this.selectedModel,
      year: this.selectedYear,
      fuel: this.selectedFuel
    }
  }

  clear() {
    //this.searchInput.nativeElement.value = '';
    //this.search.emit('');
  }
}

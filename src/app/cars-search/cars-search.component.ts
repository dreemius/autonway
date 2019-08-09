import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cars-search',
  templateUrl: './cars-search.component.html',
  styleUrls: ['./cars-search.component.css']
})
export class CarSearchComponent implements OnInit {
  @Output() search = new EventEmitter<any>();
  //@ViewChild('searchInput') searchInput: ElementRef;
  private apiKey = '4MhHmkWSVc1tdOYdKcrlx0ZDYVxI4eN67I6D5Yok';
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

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get(`https://developers.ria.com/auto/categories/1/bodystyles?api_key=${this.apiKey}`).subscribe(result => {
      this.type = result;
      this.selectedType = this.type[0].value;
    })
    this.http.get(`https://developers.ria.com/auto/type?api_key=${this.apiKey}`).subscribe(result => {
      this.fuel = result;
      this.selectedFuel = this.fuel[0].value;
    })
    this.http.get(`https://developers.ria.com/auto/categories/1/marks?api_key=${this.apiKey}`).subscribe((result: any) => {
      //this.brand = [{ name: "Выберите марку машины", value: 0 }, ...result];
      this.brand = result;
    })
  }

  onBrandChanged(selectedBrand: any): void {
    this.selectedBrand = selectedBrand.value;
    this.http.get(`https://developers.ria.com/auto/categories/1/marks/${selectedBrand.value}/models?api_key=${this.apiKey}`).subscribe((result: any) => {
      this.model = [{ name: "Выберите модель машины", value: 0 }, ...result];
      this.selectedModel = result[0].value;
    })
  }

  onSearch(searchForm: any): void {
    this.validateForm(searchForm);
    this.search.emit(this.getSearchConfig());
  }

  validateForm(searchForm: any) {
    let year = Number(searchForm.form.value.year)
    if (!Number.isInteger(year) || (year < 1950 && year > 2025)) {
      this.invalidYear = true;
      return;
    }
    this.invalidYear = false;
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
    this.search.emit('');
  }
}

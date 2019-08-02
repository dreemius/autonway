import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent implements OnInit {
  @Output() search = new EventEmitter<any>();
  //@ViewChild('searchInput') searchInput: ElementRef;
  private apiKey = '4MhHmkWSVc1tdOYdKcrlx0ZDYVxI4eN67I6D5Yok';
  private type: any;
  private brand: any;
  private model: any

  selectedType: any;
  selectedBrand: any;
  selectedModel: any;
  selectedYear: any;
  invalidYear: boolean = false;
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get(`https://developers.ria.com/auto/categories/1/bodystyles?api_key=${this.apiKey}`).subscribe(result => {
      this.type = result
    })
    this.http.get(`https://developers.ria.com/auto/categories/1/marks?api_key=${this.apiKey}`).subscribe(result => {
      this.brand = result
    })
  }

  onBrandChanged() {
    this.http.get(`https://developers.ria.com/auto/categories/1/marks/${this.selectedBrand}/models?api_key=${this.apiKey}`).subscribe(result => {
      this.model = result
    })
  }

  onSearch(searchForm) {
    let year = Number(searchForm.form.value.year)
    if (!Number.isInteger(year) || (year < 1950 && year > 2025)) {
      this.invalidYear = true;
      return;
    }

    this.invalidYear = false;
    let searchConfig = {
      type: this.selectedType,
      brand: this.selectedBrand,
      model: this.selectedModel,
      year: this.selectedYear
    }
    //console.log(searchConfig);
    this.search.emit(searchConfig);
  }

  clear() {
    //this.searchInput.nativeElement.value = '';
    this.search.emit('');
  }
}

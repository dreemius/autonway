import { Component, OnInit } from '@angular/core';
import { CardsService } from './cards.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {
  private noResults: boolean = false;
  private resultData: any;
  //private perPage: number = 3;
  //private page: number = 1;

  private apiKey = '4MhHmkWSVc1tdOYdKcrlx0ZDYVxI4eN67I6D5Yok';

  constructor(private service: CardsService, private http: HttpClient) {
  }

  ngOnInit() {

  }

  searchCars(searchParams: any) {
    if (searchParams) {
      this.http.get(`https://developers.ria.com/auto/average_price?api_key=${this.apiKey}&bodystyle=${searchParams.type}&marka_id=${searchParams.brand}&model_id=${searchParams.model}&yers=${searchParams.year}`).subscribe((result: any) => {
        this.resultData = {
          total: Math.round(result.total),
          arithmeticMean: Math.round(result.arithmeticMean),
          interQuartileMean: Math.round(result.interQuartileMean)
        }
      })
    } else {
      this.noResults = true;
    }
  }

  // get photosForPage() {
  //   const fromTo = this.getFromTo();
  //   return this.filteredPhotos.slice(fromTo.from, fromTo.to);
  // }

  // get pagingParams() {
  //   return {
  //     photosLength: this.filteredPhotos ? this.filteredPhotos.length : 0,
  //     perPage: this.perPage,
  //     page: this.page
  //   }
  // }

  // pageChanged(pageNumber) {
  //   this.page = pageNumber;
  // }

  // getFromTo() {
  //   return ({
  //     from: ((this.page - 1) * this.perPage),
  //     to: this.page * this.perPage
  //   });
  // }

}

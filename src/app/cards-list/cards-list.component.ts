import { Component, OnInit } from '@angular/core';
import { CardsService } from './cards.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {
  private photos: Array<any>;
  private filteredPhotos: Array<any>;
  private perPage: number = 3;
  private page: number = 1;

  private apiKey = '4MhHmkWSVc1tdOYdKcrlx0ZDYVxI4eN67I6D5Yok';

  constructor(private service: CardsService, private http: HttpClient) {
    
  }

  ngOnInit() {
    this.service.getData().subscribe((data: Array<any>) => {
      this.photos = data.slice(0, 48);
      this.filterPhotos();
    });


    this.http.get(`https://developers.ria.com/auto/average_price?api_key=${this.apiKey}&marka_id=9&model_id=96&raceInt=10&raceInt=100`).subscribe(result=>{

      console.log(result)
    })

  }

  filterPhotos(searchStr: string = '') {
    if (searchStr) {
      this.filteredPhotos = this.photos.filter(photo => {
        return photo.title.includes(searchStr);
      });
    } else {
      this.filteredPhotos = [...this.photos];
    }
  }

  get photosForPage() {
    const fromTo = this.getFromTo();
    return this.filteredPhotos.slice(fromTo.from, fromTo.to);
  }

  get pagingParams() {
    return {
      photosLength: this.filteredPhotos ? this.filteredPhotos.length : 0,
      perPage: this.perPage,
      page: this.page
    }
  }

  pageChanged(pageNumber) {
    this.page = pageNumber;
  }

  getFromTo() {
    return ({
      from: ((this.page - 1) * this.perPage),
      to: this.page * this.perPage
    });
  }

}

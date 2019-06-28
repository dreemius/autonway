import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent implements OnInit {
  @Output() search = new EventEmitter<any>();
  @ViewChild('searchInput') searchInput: ElementRef;
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://developers.ria.com/auto/categories/1/bodystyles?api_key=4MhHmkWSVc1tdOYdKcrlx0ZDYVxI4eN67I6D5Yok').subscribe(result => {
      console.log(result);

    })
  }

  onInput({ target }) {
    this.search.emit(target.value);





  }

  clear() {
    this.searchInput.nativeElement.value = '';
    this.search.emit('');
  }
}

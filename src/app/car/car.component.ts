import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector   : 'app-car',
  templateUrl: './car.component.html',
  styleUrls  : ['./car.component.css']
})
export class CarComponent implements OnInit {
  @Input() photo: any;
  date = Date.now();
  constructor() {
  }

  ngOnInit() {
  }
}

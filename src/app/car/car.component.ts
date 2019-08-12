import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector   : 'car-info',
  templateUrl: './car.component.html',
  styleUrls  : ['./car.component.css']
})
export class CarComponent implements OnInit {
  @Input() carInfo: any;
  date = Date.now();
  constructor() {
  }

  ngOnInit() {
  }
}

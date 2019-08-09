import { Component, ElementRef, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
    selector: 'app-cars-paging',
    templateUrl: './cars-paging.component.html',
    styleUrls: ['./cars-paging.component.css']
})
export class CarsPagingComponent implements OnInit {
    @Input() pagingParams: any;
    @Output() onPageChanged = new EventEmitter<any>();
    
    constructor() { }
    ngOnInit() {
    }

    pageChanged() {
        this.onPageChanged.emit(this.pagingParams.page);
    }

}

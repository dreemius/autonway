import { Component, ElementRef, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
    selector: 'app-card-paging',
    templateUrl: './card-paging.component.html',
    styleUrls: ['./card-paging.component.css']
})
export class CardPagingComponent implements OnInit {
    @Input() pagingParams: any;
    @Output() onPageChanged = new EventEmitter<any>();
    
    constructor() { }
    ngOnInit() {
    }

    pageChanged() {
        this.onPageChanged.emit(this.pagingParams.page);
    }

}

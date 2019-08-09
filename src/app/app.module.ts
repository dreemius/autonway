import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CarComponent } from './car/car.component';
import { CarSearchComponent } from './cars-search/cars-search.component';
import { CarsPagingComponent } from './cars-paging/cars-paging.component';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    AppComponent, 
    CarsListComponent, 
    CarComponent, 
    CarSearchComponent, 
    CarsPagingComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    AppRoutingModule, 
    HttpClientModule, 
    SharedModule, 
    AutocompleteLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

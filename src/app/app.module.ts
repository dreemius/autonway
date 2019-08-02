import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CardsListComponent } from './cards-list/cards-list.component';
import { CardComponent } from './card/card.component';
import { CardSearchComponent } from './card-search/card-search.component';
import { CardPagingComponent } from './card-paging/card-paging.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CardsListComponent, CardComponent, CardSearchComponent, CardPagingComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

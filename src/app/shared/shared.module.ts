import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';

@NgModule({
  declarations: [HeaderComponent, JumbotronComponent],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    NgbModule,
    HeaderComponent,
    JumbotronComponent,
  ]
})
export class SharedModule { }

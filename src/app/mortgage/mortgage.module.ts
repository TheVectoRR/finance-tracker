import { MortgageService } from './mortgage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MortgageComponent } from './mortgage.component';

@NgModule({
  declarations: [
    MortgageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    MortgageService
  ]
})
export class MortgageModule { }

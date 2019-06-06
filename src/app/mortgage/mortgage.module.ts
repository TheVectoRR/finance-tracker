import { MortgageService } from './mortgage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MortgageComponent } from './mortgage.component';
import { LinearMortgageComponent } from './linear-mortgage/linear-mortgage.component';

@NgModule({
  declarations: [
    MortgageComponent,
    LinearMortgageComponent
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

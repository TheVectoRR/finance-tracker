import { LinearMortgageService } from './linear-mortgage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LinearMortgageComponent } from './linear-mortgage.component';

@NgModule({
  declarations: [
    LinearMortgageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LinearMortgageService
  ]
})
export class LinearMortgageModule { }

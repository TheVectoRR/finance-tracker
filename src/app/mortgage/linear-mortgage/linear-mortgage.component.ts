import { Component, Input, OnInit } from '@angular/core';
import { Observable, } from 'rxjs';
import { MonthlyPayment } from '../../shared/models/mortgage-payment-month.model';

@Component({
  selector: 'cash-linear-mortgage',
  templateUrl: './linear-mortgage.component.html',
  styleUrls: ['./linear-mortgage.component.scss']
})
export class LinearMortgageComponent implements OnInit {

  @Input() public mortgageMonthlyPredictions$: Observable<MonthlyPayment[]>;

  constructor() { }

  public ngOnInit() {

  }

}

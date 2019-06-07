import { MortgageService } from './mortgage.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyPayment } from '../shared/models/mortgage-payment-month.model';

@Component({
  selector: 'cash-mortgage',
  templateUrl: './mortgage.component.html',
  styleUrls: ['./mortgage.component.scss']
})
export class MortgageComponent implements OnInit {

  public mortgageMonthlyPredictions$: Observable<MonthlyPayment[]>;

  constructor(private mortgageService: MortgageService) { }

  public ngOnInit() {
    this.mortgageMonthlyPredictions$ = this.mortgageService.getMonthlyPaymentsPredictions();
  }

}

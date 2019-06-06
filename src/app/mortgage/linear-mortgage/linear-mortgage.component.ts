import { Component, Input, OnInit } from '@angular/core';
import { Mortgage } from '../../shared/models/mortgage';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

const MONTHS_IN_YEAR = 12;

@Component({
  selector: 'cash-linear-mortgage',
  templateUrl: './linear-mortgage.component.html',
  styleUrls: ['./linear-mortgage.component.scss']
})
export class LinearMortgageComponent implements OnInit {

  @Input() public mortgageData$: Observable<Mortgage>;
  // this.mortgageService.getMortgageData().subscribe((mortgageData) => {
  //   this.totalAmount$ = of(mortgageData.totalAmount);
  //   this.lengthInMonths$ = of(mortgageData.lengthInYears * MONTHS_IN_YEAR);
  //   this.startingDate$ = of(mortgageData.startingDate.format('MM-YYYY'));
  //   this.fixedInterests$ = of(mortgageData.fixedInterests);
  // });

  public redemptionAmountPerMonth: number;

  constructor() { }

  public ngOnInit() {
    this.mortgageData$.pipe(
      first()
    ).subscribe((mortgageData) => {
      this.redemptionAmountPerMonth = mortgageData.totalAmount / (mortgageData.lengthInYears * MONTHS_IN_YEAR);
    });
  }

}

import { MortgageService } from './mortgage.service';
import { Component, OnInit } from '@angular/core';

const MONTHS_IN_YEAR = 12;

@Component({
  selector: 'cash-mortgage',
  templateUrl: './mortgage.component.html',
  styleUrls: ['./mortgage.component.scss']
})
export class MortgageComponent implements OnInit {

  public totalAmount: number;
  public lengthInMonths: number;
  public startingDate: string;

  constructor(private mortgageService: MortgageService) { }

  public ngOnInit() {
    this.mortgageService.getMortgageData().subscribe((mortgageData) => {
      this.totalAmount = mortgageData.totalAmount;
      this.lengthInMonths = mortgageData.lengthInYears * MONTHS_IN_YEAR;
      this.startingDate = mortgageData.startingDate.format('MM-YYYY');
    });
  }

}

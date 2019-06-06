import { MortgageService } from './mortgage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cash-mortgage',
  templateUrl: './mortgage.component.html',
  styleUrls: ['./mortgage.component.scss']
})
export class MortgageComponent implements OnInit {

  public totalAmount: number;
  public lengthInYears: number;

  constructor(private mortgageService: MortgageService) { }

  ngOnInit() {
    this.mortgageService.getMortgageData().subscribe((mortgageData) => {
      this.totalAmount = mortgageData.totalAmount;
      this.lengthInYears = mortgageData.lengthInYears;
    });
  }

}

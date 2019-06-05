import { LinearMortgageService } from './linear-mortgage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cash-linear-mortgage',
  templateUrl: './linear-mortgage.component.html',
  styleUrls: ['./linear-mortgage.component.scss']
})
export class LinearMortgageComponent implements OnInit {

  public totalAmount: number;
  public lengthInYears: number;

  constructor(private linearMortgageService: LinearMortgageService) { }

  ngOnInit() {
    this.linearMortgageService.getMortgageData().subscribe((mortgageData) => {
      this.totalAmount = mortgageData.totalAmount;
      this.lengthInYears = mortgageData.lengthInYears;
    })
  }

}

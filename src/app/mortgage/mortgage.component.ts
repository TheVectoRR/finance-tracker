import { MortgageService } from './mortgage.service';
import { Component, OnInit } from '@angular/core';
import { Mortgage } from '../shared/models/mortgage';
import { Observable } from 'rxjs';

@Component({
  selector: 'cash-mortgage',
  templateUrl: './mortgage.component.html',
  styleUrls: ['./mortgage.component.scss']
})
export class MortgageComponent implements OnInit {

  public mortgageData$: Observable<Mortgage>;

  constructor(private mortgageService: MortgageService) { }

  public ngOnInit() {
    this.mortgageData$ = this.mortgageService.getMortgageData();
  }

}

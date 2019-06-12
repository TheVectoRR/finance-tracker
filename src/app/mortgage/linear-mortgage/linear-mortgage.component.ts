import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Observable, } from 'rxjs';
import { MonthlyPayment } from '../../shared/models/mortgage-payment-month.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'cash-linear-mortgage',
  templateUrl: './linear-mortgage.component.html',
  styleUrls: ['./linear-mortgage.component.scss']
})
export class LinearMortgageComponent implements AfterViewInit {

  @Input() public mortgageMonthlyPredictions$: Observable<MonthlyPayment[]>;

  @ViewChild('linearMortgageChart', {static: false}) graphCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  public mortgageChart: Chart;

  private mortgageRentPaymentEachMonth: number[] = [];
  private mortgageRedemptionPaymentEachMonth: number[] = [];
  private mortgageyears: string[] = [];

  constructor() { }

  public ngAfterViewInit(): void {
    this.mortgageMonthlyPredictions$.subscribe(
      (mortgageData) => {
        mortgageData.forEach((month) => {
          this.mortgageRedemptionPaymentEachMonth.push(month.monthlyCapitalPayment);
          this.mortgageRentPaymentEachMonth.push(month.monthlyRentPayment);
          this.mortgageyears.push(month.monthTitle);
        });

        this.loadChart();
      }
    );
  }

  private loadChart(): void {
    this.context = (this.graphCanvas.nativeElement).getContext('2d');

    const data = {
      labels: this.mortgageyears, // your labels array
      datasets: [{
        label: 'total redemption payment per month',
        backgroundColor: 'rgba(132,99,255,0.2)',
        borderColor: 'rgba(132,99,255,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(132,99,255,0.4)',
        hoverBorderColor: 'rgba(132,99,255,1)',
        data: this.mortgageRedemptionPaymentEachMonth, // your data array
      }, {
        label: 'total rent payment per month',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: this.mortgageRentPaymentEachMonth, // your data array
      }]
    };

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        yAxes: [{
          stacked: true,
          gridLines: {
            display: true,
            color: 'rgba(255,99,132,0.2)'
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
      }
    };

    this.mortgageChart = new Chart(this.context, {
      type: 'line',
      data,
      options
    });
  }

}

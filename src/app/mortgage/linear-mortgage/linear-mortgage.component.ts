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

  @ViewChild('monthlyPaymentsChart', {static: false}) monthlyPaymentsChartCanvas: ElementRef;
  public monthlyPaymentsChartContext: CanvasRenderingContext2D;

  @ViewChild('capitalBurnDownChart', {static: false}) capitalBurnDownChartCanvas: ElementRef;
  public capitalBurnDownContext: CanvasRenderingContext2D;

  public monthlyPaymentsChart: Chart;
  public capitalBurnDownChart: Chart;

  private mortgageRentPaymentEachMonth: number[] = [];
  private mortgageRedemptionPaymentEachMonth: number[] = [];
  private mortgageyears: string[] = [];
  private capitalBurndown: number[] = [];

  constructor() { }

  public ngAfterViewInit(): void {
    this.mortgageMonthlyPredictions$.subscribe(
      (mortgageData) => {
        mortgageData.forEach((month) => {
          this.mortgageRedemptionPaymentEachMonth.push(month.monthlyRedemptionPayment);
          this.mortgageRentPaymentEachMonth.push(month.monthlyRentPayment);
          this.mortgageyears.push(month.monthTitle);
          this.capitalBurndown.push(month.totalCapitalStillToPay);
        });

        this.loadMonthlyPaymentsGraph();
        this.loadTotalCapitalBurnDownGraph();
      }
    );
  }

  private loadMonthlyPaymentsGraph(): void {
    this.monthlyPaymentsChartContext = (this.monthlyPaymentsChartCanvas.nativeElement).getContext('2d');

    const data = {
      labels: this.mortgageyears, // your labels array
      datasets: [{
        label: 'redemption payments',
        backgroundColor: 'rgba(132,99,255,0.2)',
        borderColor: 'rgba(132,99,255,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(132,99,255,0.4)',
        hoverBorderColor: 'rgba(132,99,255,1)',
        data: this.mortgageRedemptionPaymentEachMonth, // your data array
      }, {
        label: 'rent payments',
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

    this.monthlyPaymentsChart = new Chart(this.monthlyPaymentsChartContext, {
      type: 'line',
      data,
      options
    });
  }

  private loadTotalCapitalBurnDownGraph(): void {
    this.capitalBurnDownContext = (this.capitalBurnDownChartCanvas.nativeElement).getContext('2d');

    const data = {
      labels: this.mortgageyears, // your labels array
      datasets: [{
        label: 'capital burn down',
        backgroundColor: 'rgba(132,99,255,0.2)',
        borderColor: 'rgba(132,99,255,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(132,99,255,0.4)',
        hoverBorderColor: 'rgba(132,99,255,1)',
        data: this.capitalBurndown, // your data array
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

    this.capitalBurnDownChart = new Chart(this.capitalBurnDownContext, {
      type: 'line',
      data,
      options
    });

  }

}

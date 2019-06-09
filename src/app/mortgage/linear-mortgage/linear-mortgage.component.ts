import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, } from 'rxjs';
import { MonthlyPayment } from '../../shared/models/mortgage-payment-month.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'cash-linear-mortgage',
  templateUrl: './linear-mortgage.component.html',
  styleUrls: ['./linear-mortgage.component.scss']
})
export class LinearMortgageComponent implements OnInit, AfterViewInit {

  @Input() public mortgageMonthlyPredictions$: Observable<MonthlyPayment[]>;

  @ViewChild('linearMortgageChart', {static: false}) graphCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  public mortgageChart: Chart;

  private mortgageAmountsEachMonth: number[] = [];
  private mortgageyears: string[] = [];

  constructor() { }

  public ngOnInit() {
    this.mortgageMonthlyPredictions$.subscribe(
    (mortgageData) => {
        mortgageData.forEach((month) => {
          this.mortgageAmountsEachMonth.push(month.totalToPayThisMonth);
          this.mortgageyears.push(month.monthTitle);
        });
     }
    );
  }

  public ngAfterViewInit(): void {
    this.context = (this.graphCanvas.nativeElement).getContext('2d');

    this.mortgageChart = new Chart(this.context, {
      type: 'line',
      data: {
        labels: this.mortgageyears, // your labels array
        datasets: [
          {
            data: this.mortgageAmountsEachMonth, // your data array
            borderColor: '#00AEFF',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

}

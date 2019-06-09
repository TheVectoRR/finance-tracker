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

  constructor() { }

  public ngAfterViewInit(): void {
    this.context = (this.graphCanvas.nativeElement).getContext('2d');

    this.mortgageChart = new Chart(this.context, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // your labels array
        datasets: [
          {
            data: [12, 19, 3, 5, 2, 3], // your data array
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

  public ngOnInit() {

  }

}

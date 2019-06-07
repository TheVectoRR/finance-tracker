import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { MonthlyPayment } from '../shared/models/mortgage-payment-month.model';

// const MORTGAGE_DATA_PATH = 'assets/dummy-mortgage-data.json';
const MORTGAGE_DATA_PATH = 'assets/my-mortgage-data.json';

const MONTHS_IN_YEAR = 12;

@Injectable()
export class MortgageService {

    private mortgageData: Observable<MortgageResponse>;

    constructor(private http: HttpClient) { }

    private getMortgageData(): Observable<MortgageResponse> {
      if (!this.mortgageData) {
        this.mortgageData = this.http.get(MORTGAGE_DATA_PATH).pipe(
          map((data: MortgageResponse) => ({
            totalAmount: data.totalAmount,
            lengthInYears: data.lengthInYears,
            startingDate: moment(data.startingDate, 'DD-MM-YYYY'),
            fixedInterests: data.fixedInterests
          }))
        );
      }
      return this.mortgageData;
    }

    public getMonthlyPaymentsPredictions(): Observable<MonthlyPayment[]> {

      const mortgageData$ = this.getMortgageData().pipe(
        map((mortgageData) => ({
          totalCapitalToPay: mortgageData.totalAmount,
          lengthInMonths: mortgageData.lengthInYears * MONTHS_IN_YEAR,
          startingDate: mortgageData.startingDate,
          fixedInterestRate: mortgageData.fixedInterests[0].interestRate,
          redemptionAmountPerMonth: mortgageData.totalAmount / (mortgageData.lengthInYears * MONTHS_IN_YEAR),
        }))
      );

      return mortgageData$.pipe(
        map((mortgageData) => {
          const monthArray: MonthlyPayment[] = [];

          for (let monthCtr = 0; monthCtr < mortgageData.lengthInMonths; monthCtr++) {
            const rentPayment = (mortgageData.fixedInterestRate / 100 *
              (mortgageData.totalCapitalToPay - mortgageData.redemptionAmountPerMonth * monthCtr)) / MONTHS_IN_YEAR;

            monthArray.push({
              monthTitle: mortgageData.startingDate.add(1, 'month').format('MM-YYYY'),
              monthlyCapitalPayment: mortgageData.redemptionAmountPerMonth,
              monthlyRentPayment: rentPayment,
              totalToPayThisMonth: mortgageData.redemptionAmountPerMonth + rentPayment,
              totalCapitalStillToPay: mortgageData.totalCapitalToPay - mortgageData.redemptionAmountPerMonth * (monthCtr + 1),
              extraRedemptionPaymentThisMonth: 0
            });
          }

          return monthArray;
        })
      );
    }
}

export interface MortgageResponse {
  totalAmount: number;
  lengthInYears: number;
  startingDate: moment.Moment;
  fixedInterests: FixedInterest[];
}

export interface FixedInterest {
  interestRate: number;
  lengthInYears: number;
}


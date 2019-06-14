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
            fixedInterests: data.fixedInterests,
            extraRedemptions: data.extraRedemptions.map((redemption) => ({
              dateOfRedemption: moment(redemption.dateOfRedemption, 'DD-MM-YYYY'),
              redemptionAmount: redemption.redemptionAmount
            }))
          }))
        );
      }
      return this.mortgageData;
    }

    public getMonthlyPaymentsPredictions(): Observable<MonthlyPayment[]> {

      return this.getMortgageData().pipe(
        map((mortgageData) => {
          const monthArray: MonthlyPayment[] = [];
          let totalCapitalStillToPay = mortgageData.totalAmount;
          const redemptionAmountPerMonth = mortgageData.totalAmount / (mortgageData.lengthInYears * MONTHS_IN_YEAR);

          for (let monthCtr = 0; monthCtr < mortgageData.lengthInYears * MONTHS_IN_YEAR; monthCtr++) {
            const currentMonth = mortgageData.startingDate.add(1, 'month').format('MM-YYYY');

            const interestRateForPeriod = this.getInterestRateForMonthNumber(monthCtr, mortgageData.fixedInterests);
            const rentPayment = (interestRateForPeriod / 100 * totalCapitalStillToPay) / MONTHS_IN_YEAR;

            const extraRedemptionMonth = mortgageData.extraRedemptions
              .find((extraRed) => (extraRed.dateOfRedemption.format('MM-YYYY') === currentMonth));

            const extraRedemption = extraRedemptionMonth ? extraRedemptionMonth.redemptionAmount : 0;

            totalCapitalStillToPay = totalCapitalStillToPay - redemptionAmountPerMonth - extraRedemption;

            monthArray.push({
              monthTitle: currentMonth,
              monthlyRedemptionPayment: redemptionAmountPerMonth,
              monthlyRentPayment: rentPayment,
              totalToPayThisMonth: redemptionAmountPerMonth + rentPayment,
              totalCapitalStillToPay,
              extraRedemptionPaymentThisMonth: extraRedemption
            });
          }

          return monthArray;
        })
      );
    }

    private getInterestRateForMonthNumber(monthNumber: number, interestRateArray: FixedInterest[]): number {
      return interestRateArray
        .reduce((period1, period2) => (monthNumber <= period1.lengthInYears * MONTHS_IN_YEAR) ? period1 : period2)
        .interestRate;
    }
}

interface MortgageResponse {
  totalAmount: number;
  lengthInYears: number;
  startingDate: moment.Moment;
  fixedInterests: FixedInterest[];
  extraRedemptions: ExtraRedemption[];
}

interface FixedInterest {
  interestRate: number;
  lengthInYears: number;
}

interface ExtraRedemption {
  dateOfRedemption: moment.Moment;
  redemptionAmount: number;
}



import { Mortgage } from '../shared/models/mortgage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// const MORTGAGE_DATA_PATH = 'assets/dummy-mortgage-data.json';
const MORTGAGE_DATA_PATH = 'assets/my-mortgage-data.json';

@Injectable()
export class MortgageService {

    constructor(private http: HttpClient) { }

    public getMortgageData(): Observable<Mortgage> {
        return this.http.get(MORTGAGE_DATA_PATH).pipe(
          map((data: any) => ({
            totalAmount: data.totalAmount,
            lengthInYears: data.lengthInYears,
            startingDate: moment(data.startingDate, 'DD-MM-YYYY'),
            fixedInterests: data.fixedInterests
          }))
        );
    }
}

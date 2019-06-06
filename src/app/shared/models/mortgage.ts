import { FixedInterest } from './mortgage';
import * as moment from 'moment';

export interface Mortgage {
    totalAmount: number;
    lengthInYears: number;
    startingDate: moment.Moment;
    fixedInterests: FixedInterest[];
}

export interface FixedInterest {
    interestRate: number;
    lengthInYears: number;
}

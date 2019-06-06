import { FixedInterest } from './mortgage';
import * as moment from 'moment';

export interface Mortgage {
    totalAmount: number;
    lengthInYears: number;
    startingDate: moment.Moment;
    FixedInterests: FixedInterest[];
}

export interface FixedInterest {
    interestRate: number;
    lengthInYears: number;
}

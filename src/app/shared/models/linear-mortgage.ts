import { FixedInterest } from './linear-mortgage';
export interface LinearMortgage {
    totalAmount: number;
    lengthInYears: number;
    FfxedInterests: FixedInterest[];
}

export interface FixedInterest {
    interestRate: number;
    lengthInYears: number;
}
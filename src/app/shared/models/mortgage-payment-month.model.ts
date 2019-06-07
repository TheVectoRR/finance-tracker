export interface MonthlyPayment {
  monthTitle: string;
  monthlyCapitalPayment: number;
  monthlyRentPayment: number;
  totalToPayThisMonth: number;
  totalCapitalStillToPay: number;
  extraRedemptionPaymentThisMonth: number;
}

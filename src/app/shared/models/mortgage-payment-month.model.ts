export interface MonthlyPayment {
  monthTitle: string;
  monthlyRedemptionPayment: number;
  monthlyRentPayment: number;
  totalToPayThisMonth: number;
  totalCapitalStillToPay: number;
  extraRedemptionPaymentThisMonth: number;
}

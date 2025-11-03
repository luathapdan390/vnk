
export interface CalculationInput {
  monthlyInvestment: number;
  stockPrice: number;
  dividendRate: number;
  dividendFrequency: number;
  years: number;
  interestRate: number;
}

export interface CalculationResult {
  totalShares: number;
  totalDividends: number;
  futureValueOfCapital: number;
  futureValueOfDividends: number;
  totalOpportunityCost: number;
}

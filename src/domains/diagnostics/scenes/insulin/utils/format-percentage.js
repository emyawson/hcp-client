export const formatDecimalAsPercentage = decimalNumber =>
  decimalNumber ? `${Math.round(decimalNumber * 100)}%` : '0%';

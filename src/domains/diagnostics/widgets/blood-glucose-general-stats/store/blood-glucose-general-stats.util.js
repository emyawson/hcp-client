export const zeroCheck = value =>
  value === 0 || parseInt(value, 10) === 0 ? '-' : value;

import { diffInDaysInclusiveOfEnds } from 'src/domains/diagnostics/utils';

export const calculateIntervalAverageTestsPerDay = (
  measurements,
  startDate,
  endDate,
) => {
  const numberOfIntervalDays = diffInDaysInclusiveOfEnds(startDate, endDate);

  const numberOfIntervalTests = measurements.length;

  return numberOfIntervalTests !== 0 && numberOfIntervalDays !== 0
    ? numberOfIntervalTests / numberOfIntervalDays
    : 0;
};

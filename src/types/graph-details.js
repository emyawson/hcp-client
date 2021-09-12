export type GraphDetails = {
  bloodGlucoseValues: {
    bloodGlucoseMean: number,
    bloodGlucoseStandardDeviation: number,
    testsPerDay: number,
  },
  targetRangesValues: {
    abovePercentage: number,
    belowPercentage: number,
    hypoglycaemiaNumber: number,
    hypoglycaemiaPercentage: number,
    targetBloodGlucoseMinimum: number,
    targetBloodGlucoseMaximum: number,
    withinPercentage: number,
  },
};

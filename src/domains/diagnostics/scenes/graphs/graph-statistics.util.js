import { MIN_BG } from 'src/domains/diagnostics/store/constants';
import { calculateBloodGlucoseIndex } from 'src/domains/diagnostics/utils/graph-statistics.util';
import { average } from 'src/domains/diagnostics/utils';

export const roundToNDecimalPlaces = (number, n) => {
  const factor = Math.pow(10, n);
  return Math.round(number * factor) / factor;
};

export const calculateLowBloodGlucoseIndex = measurements =>
  average(
    measurements.map(
      measurement =>
        measurement.value < MIN_BG
          ? calculateBloodGlucoseIndex(measurement.value).bgIndex
          : 0,
    ),
  );

export const calculateHighBloodGlucoseIndex = measurements =>
  average(
    measurements.map(
      measurement =>
        measurement.value > MIN_BG
          ? calculateBloodGlucoseIndex(measurement.value).bgIndex
          : 0,
    ),
  );

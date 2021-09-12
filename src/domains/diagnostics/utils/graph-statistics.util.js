import {
  EMPTY_VALUE_PLACEHOLDER,
  HYPO_RISK_MIN,
  HYPO_RISK_MAX,
  MIN_BG,
} from 'src/domains/diagnostics/store/constants';
import { average } from 'src/domains/diagnostics/utils';

export const roundToNDecimalPlaces = (number, n) => {
  const factor = Math.pow(10, n);
  return Math.round(number * factor) / factor;
};

export const calculateBloodGlucoseIndex = bloodGlucose => {
  let bg = bloodGlucose;
  if (bloodGlucose < HYPO_RISK_MIN) {
    bg = HYPO_RISK_MIN;
  } else if (bloodGlucose > HYPO_RISK_MAX) {
    bg = HYPO_RISK_MAX;
  }

  return {
    bgIndex: roundToNDecimalPlaces(
      10 * Math.pow(1.509 * (Math.pow(Math.log(bg), 1.084) - 5.381), 2),
      1,
    ),
    bg,
  };
};

export const getFormattedBloodGlucoseIndex = (
  calculateBloodGlucoseIndex,
  measurements = [],
) => {
  if (!measurements.length) {
    return EMPTY_VALUE_PLACEHOLDER;
  }

  return calculateBloodGlucoseIndex(measurements).toFixed(1);
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

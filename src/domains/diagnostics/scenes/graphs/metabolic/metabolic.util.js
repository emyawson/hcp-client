import { colors } from 'src/domains/diagnostics/styles';

export const shouldTickShow = (tickValue, thresholds, tolerance) => {
  const {
    glucoseIdealIntervalMax,
    glucoseIdealIntervalMin,
    hypoglycemiaThreshold,
  } = thresholds;
  return (
    Math.abs(tickValue - glucoseIdealIntervalMax) > tolerance &&
    Math.abs(tickValue - glucoseIdealIntervalMin) > tolerance &&
    Math.abs(tickValue - hypoglycemiaThreshold) > tolerance
  );
};

export const createThresholdTicks = (thresholds, tolerance, maxY) => {
  const {
    glucoseIdealIntervalMax,
    glucoseIdealIntervalMin,
    hypoglycemiaThreshold,
  } = thresholds;
  const thresholdTicks = [
    {
      value: hypoglycemiaThreshold / maxY,
      label: hypoglycemiaThreshold,
      fill: colors.red,
    },
  ];

  if (Math.abs(glucoseIdealIntervalMax - hypoglycemiaThreshold) > tolerance) {
    thresholdTicks.push({
      value: glucoseIdealIntervalMax / maxY,
      label: glucoseIdealIntervalMax,
      fill: colors.green,
    });
  }

  if (
    Math.abs(glucoseIdealIntervalMax - glucoseIdealIntervalMin) > tolerance &&
    Math.abs(glucoseIdealIntervalMin - hypoglycemiaThreshold) > tolerance
  ) {
    thresholdTicks.push({
      value: glucoseIdealIntervalMin / maxY,
      label: glucoseIdealIntervalMin,
      fill: colors.green,
    });
  }

  return thresholdTicks;
};

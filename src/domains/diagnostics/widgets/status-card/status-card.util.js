import { isNil } from 'ramda';

import { translate } from 'src/i18n';
import {
  calculateHypoRiskColor,
  calculateMeanColor,
  isHypoRed,
  isHypoYellow,
  isHyperRed,
  isHyperYellow,
  isInRange,
  isHypoRiskLow,
  isHypoRiskMedium,
  isHypoRiskHigh,
  TRAFFIC_LIGHT_COLORS,
  VARIABILITY_THRESHOLDS,
} from 'src/domains/diagnostics/scenes/blood-glucose-overview/store';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

export const STATUS_LABELS = {
  LOW: 'dashboard.statusCard.low',
  MODERATE: 'dashboard.statusCard.moderate',
  MEDIUM: 'dashboard.statusCard.medium',
  HIGH: 'dashboard.statusCard.high',
  ABOVE: 'dashboard.statusCard.above',
  WITHIN: 'dashboard.statusCard.within',
  BELOW: 'dashboard.statusCard.below',
  TARGET_RANGE: 'dashboard.statusCard.targetRange',
  HYPO_LIMIT: 'dashboard.statusCard.hypoLimit',
  NONE: '-',
};

const emptyStatus = {
  color: TRAFFIC_LIGHT_COLORS.GRAY,
  label: STATUS_LABELS.NONE,
};

export const toVariabilityStatus = (value, numberOfMeasurements) => {
  if (
    numberOfMeasurements === 0 ||
    (isNil(value) || value === EMPTY_VALUE_PLACEHOLDER)
  ) {
    return emptyStatus;
  }

  if (value < VARIABILITY_THRESHOLDS.MEDIUM) {
    return {
      color: TRAFFIC_LIGHT_COLORS.GREEN,
      label: translate(STATUS_LABELS.LOW),
    };
  } else if (value < VARIABILITY_THRESHOLDS.HIGH) {
    return {
      color: TRAFFIC_LIGHT_COLORS.YELLOW,
      label: translate(STATUS_LABELS.MODERATE),
    };
  } else {
    return {
      color: TRAFFIC_LIGHT_COLORS.RED,
      label: translate(STATUS_LABELS.HIGH),
    };
  }
};

const calculateMeanLabel = (
  value,
  {
    glucoseIdealIntervalMin,
    glucoseIdealIntervalMax,
    hypoglycemiaThreshold,
    upperHyperThreshold,
  },
) => {
  if (isHypoRed(value, hypoglycemiaThreshold)) {
    return `${translate(STATUS_LABELS.BELOW)} ${translate(
      STATUS_LABELS.HYPO_LIMIT,
    )}`;
  }
  if (isHypoYellow(value, hypoglycemiaThreshold, glucoseIdealIntervalMin)) {
    return `${translate(STATUS_LABELS.BELOW)} ${translate(
      STATUS_LABELS.TARGET_RANGE,
    )}`;
  }
  if (isInRange(value, glucoseIdealIntervalMin, glucoseIdealIntervalMax)) {
    return `${translate(STATUS_LABELS.WITHIN)} ${translate(
      STATUS_LABELS.TARGET_RANGE,
    )}`;
  }
  if (
    isHyperYellow(value, glucoseIdealIntervalMax, upperHyperThreshold) ||
    isHyperRed(value, upperHyperThreshold)
  ) {
    return `${translate(STATUS_LABELS.ABOVE)} ${translate(
      STATUS_LABELS.TARGET_RANGE,
    )}`;
  }
  return STATUS_LABELS.NONE;
};

export const toMeanStatus = (value, numberOfMeasurements, thresholds) => {
  if (numberOfMeasurements === 0) {
    return emptyStatus;
  }

  return {
    color: calculateMeanColor(value, thresholds),
    label: calculateMeanLabel(value, thresholds),
  };
};

export const calculateHypoRiskLabel = lbgi => {
  if (isHypoRiskLow(lbgi)) {
    return translate(STATUS_LABELS.LOW);
  } else if (isHypoRiskMedium(lbgi)) {
    return translate(STATUS_LABELS.MEDIUM);
  } else if (isHypoRiskHigh(lbgi)) {
    return translate(STATUS_LABELS.HIGH);
  }

  return STATUS_LABELS.NONE;
};

export const toHypoRiskStatus = hypoRisk => {
  if (isNil(hypoRisk) || hypoRisk.numberOfMeasurements === 0) {
    return emptyStatus;
  }

  const { lbgi, numberOfMeasurements } = hypoRisk;

  return {
    color: calculateHypoRiskColor(lbgi, numberOfMeasurements),
    label: calculateHypoRiskLabel(lbgi),
  };
};

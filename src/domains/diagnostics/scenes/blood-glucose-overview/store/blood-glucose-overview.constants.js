import { translate } from 'src/i18n';

export const VARIABILITY_THRESHOLDS = {
  MEDIUM: 33,
  HIGH: 50,
};

export const TRAFFIC_LIGHT_COLORS = {
  GRAY: 'GRAY',
  GREEN: 'GREEN',
  RED: 'RED',
  YELLOW: 'YELLOW',
};

export const NO_MEASUREMENTS_INTERVAL_LABEL = '-';

export const TRAFFIC_LIGHT_LABELS = {
  HYPO: translate('bloodGlucoseOverview.hypo'),
  HYPER: translate('bloodGlucoseOverview.hyper'),
  IN_RANGE: translate('bloodGlucoseOverview.inRange'),
  LOW: translate('bloodGlucoseOverview.low'),
  MEDIUM: translate('bloodGlucoseOverview.medium'),
  HIGH: translate('bloodGlucoseOverview.high'),
  INSUFFICIENT_INFO: translate('bloodGlucoseOverview.na'),
  NO_INFO: NO_MEASUREMENTS_INTERVAL_LABEL,
};

export const MINIMUM_TESTS_FOR_INTERVAL = 28;
export const MINIMUM_AVERAGE_TESTS_FOR_DAY = 2;

export const NUMBER_BLOOD_GLUCOSE_OVERVIEW_COLUMNS = 6;

export const HYPO_RISK_THRESHOLDS = {
  MEDIUM: 1.1,
  HIGH: 2.5,
};

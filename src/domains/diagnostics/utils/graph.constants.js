import { colors } from 'src/domains/diagnostics/styles';
import { convertPxToRem } from 'src/domains/diagnostics/utils';

export const GRAPH_TREND = 'trend';
export const GRAPH_STANDARD_DAY = 'standard-day';
export const GRAPH_STANDARD_WEEK = 'standard-week';
export const GRAPH_METABOLIC_RATE = 'metabolic-rate';
export const GRAPH_INSULIN = 'insulin';
export const GRAPH_INSULIN_PUMP = 'insulin-pump';
export const GRAPH_LOGBOOK = 'logbook';
export const GRAPH_LOGBOOK_DIARY = 'logbook-diary';
export const GRAPH_LOGBOOK_STATS = 'logbook-stats';
export const GRAPH_BLOOD_GLUCOSE_GENERAL_STATS = 'blood-glucose-general-stats';

export const GRAPH_TYPE_TREND = 'trend';
export const GRAPH_TYPE_DETAILS = 'details';

export const LOGBOOK_TYPE_DIARY = 'diary';
export const LOGBOOK_TYPE_STATS = 'statistics';
export const LOGBOOK_TYPE_DETAILS = 'details';

export const GRAPHS = {
  TREND: GRAPH_TREND,
  STANDARD_DAY: GRAPH_STANDARD_DAY,
  STANDARD_WEEK: GRAPH_STANDARD_WEEK,
  METABOLIC_RATE: GRAPH_METABOLIC_RATE,
  INSULIN: GRAPH_INSULIN,
  INSULIN_PUMP: GRAPH_INSULIN_PUMP,
  LOGBOOK: GRAPH_LOGBOOK,
  BLOOD_GLUCOSE_GENERAL_STATS: GRAPH_BLOOD_GLUCOSE_GENERAL_STATS,
};

export const GRAPHS_NO_TABS = [GRAPH_BLOOD_GLUCOSE_GENERAL_STATS];
export const GRAPH_DEFAULT_DASHBOARD = GRAPH_STANDARD_DAY;

export const GRAPH_CONTAINER_MIN_HEIGHT = '54rem';

export const MIN_EXPANDED_STD_GRAPH_HEIGHT = 420;
export const MIN_EXPANDED_STD_GRAPH_HEIGHT_IN_REM = convertPxToRem(
  MIN_EXPANDED_STD_GRAPH_HEIGHT,
);
export const COLLAPSED_DETAIL_GRAPH_HEIGHT = 250;
// ^ COLLAPSED_DETAIL_GRAPH_HEIGHT can be deleted once standard-day-detail graph
// is convereted to use new library, as only COLLAPSED_STD_GRAPH_HEIGHT will be used
export const COLLAPSED_STD_GRAPH_HEIGHT = 288;
export const COLLAPSED_STD_GRAPH_HEIGHT_IN_REM = convertPxToRem(
  COLLAPSED_STD_GRAPH_HEIGHT,
);

export const LOGBOOK_LOGBOOK_MIN_WIDTH = '80rem';

export const GRAPH_Y_MIN = 0;
export const GRAPH_Y_MAX = 400;
export const GRAPH_Y_INTERVAL = 50;

export const NORMALIZED_GRAPH_Y_MAX = 1;

export const Y_AXIS_TICK_VISIBILITY_TOLERANCE = 14;

export const PRIMARY_TICK_COLOR = colors.silverDark;
export const HYPO_TICK_COLOR = colors.red;
export const TARGET_RANGE_TICK_COLOR = colors.green;

export const TARGET_RANGE_MAX_TICK_KEY = 'targetRangeMax';
export const TARGET_RANGE_MIN_TICK_KEY = 'targetRangeMin';
export const THRESHOLD_TICK_KEY = 'threshold';

export const GRAPH_AXES_FONT_MULTIPLIER = {
  COLLAPSED: 0.04,
  EXPANDED: 0.02,
};

export const BOLUS_TYPE_ICONS = {
  STANDARD: 'standard',
  QUICK: 'quick',
  EXTENDED: 'extended',
  MULTIWAVE: 'multiwave',
};

export const BOLUS_CONDITIONS = {
  ADVICE: 'ADVICE',
  MODIFIED: 'MODIFIED',
};

export const BASAL_RATE_PLUS_BOLUS = 'BASAL_RATE_PLUS_BOLUS';

export const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const GROUPED_TIME_INTERVALS = {
  BREAKFAST: 'BREAKFAST',
  LUNCH: 'LUNCH',
  DINNER: 'DINNER',
  NIGHT: 'NIGHT',
  BEDTIME: 'BEDTIME',
};

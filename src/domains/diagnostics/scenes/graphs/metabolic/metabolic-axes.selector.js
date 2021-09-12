import { createSelector } from 'reselect';

import { selectGraphThreshold } from 'src/domains/diagnostics/store/selectors';
import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { shouldTickShow, createThresholdTicks } from './metabolic.util';
import {
  METABOLIC_GRAPH_Y_MAX,
  METABOLIC_GRAPH_X_MAX,
  GRAPH_LABEL_VALUE,
  TICK_VISIBILITY_TOLERANCE,
  Y_TICK_INCREMENTS,
} from './metabolic.constant';

export const selectThresholds = createSelector(
  selectGraphThreshold,
  threshold => ({
    glucoseIdealIntervalMax: threshold.glucoseIdealIntervalMax,
    glucoseIdealIntervalMin: threshold.glucoseIdealIntervalMin,
    hypoglycemiaThreshold: threshold.hypoglycemiaThreshold,
  }),
);

export const selectStabilityLabels = state => ({
  stableHigh: translate('graphs.metabolicGraph.labels.stableHigh'),
  stableLow: translate('graphs.metabolicGraph.labels.stableLow'),
  unstableHigh: translate('graphs.metabolicGraph.labels.unstableHigh'),
  unstableLow: translate('graphs.metabolicGraph.labels.unstableLow'),
});

export const selectVerticalLabel = state => [
  {
    value: GRAPH_LABEL_VALUE,
    label: `${translate('graphs.axisLabels.meanBloodGlucose')} (${translate(
      'graphs.axisLabels.mgPerDL',
    )})`,
  },
];

export const selectHorizontalLabel = state => [
  {
    value: GRAPH_LABEL_VALUE,
    label: `${translate('graphs.axisLabels.standardDeviation')} (${translate(
      'graphs.axisLabels.mgPerDL',
    )})`,
  },
];

export const selectMetabolicVerticalTicks = createSelector(
  selectThresholds,
  thresholds => {
    const ticks = [
      ...createThresholdTicks(
        thresholds,
        TICK_VISIBILITY_TOLERANCE,
        METABOLIC_GRAPH_Y_MAX,
      ),
    ];

    let tickValue = 0;

    while (tickValue <= METABOLIC_GRAPH_Y_MAX) {
      if (shouldTickShow(tickValue, thresholds, TICK_VISIBILITY_TOLERANCE)) {
        ticks.push({
          value: tickValue / METABOLIC_GRAPH_Y_MAX,
          label: tickValue,
        });
      }
      tickValue += Y_TICK_INCREMENTS;
    }

    return ticks;
  },
);

export const selectVerticalTicksDashboard = createSelector(
  selectThresholds,
  thresholds => [
    ...createThresholdTicks(
      thresholds,
      TICK_VISIBILITY_TOLERANCE,
      METABOLIC_GRAPH_Y_MAX,
    ),
    {
      value: 0 / METABOLIC_GRAPH_Y_MAX,
      label: '0',
    },
    {
      value: 400 / METABOLIC_GRAPH_Y_MAX,
      label: '400',
    },
  ],
);

export const selectHorizontalTicks = state => [
  {
    value: 0,
    label: '0',
  },
  {
    value: 50 / METABOLIC_GRAPH_X_MAX,
    label: '50',
  },
  {
    value: 100 / METABOLIC_GRAPH_X_MAX,
    label: '100',
  },
  {
    value: 150 / METABOLIC_GRAPH_X_MAX,
    label: '150',
  },
];

import { createStructuredSelector } from 'reselect';

import { selectGraphLoading } from 'src/domains/diagnostics/store/selectors';

import {
  selectThresholds,
  selectVerticalLabel,
  selectMetabolicVerticalTicks,
  selectVerticalTicksDashboard,
  selectHorizontalLabel,
  selectHorizontalTicks,
  selectStabilityLabels,
} from './metabolic-axes.selector';
import {
  selectFilteredMetabolicGraphData,
  selectMeanBGSD,
  selectSD1,
} from './metabolic-data.selector';
import { selectGraphStatistics } from './metabolic-statistics.selector';

export const selectToggles = state => ({
  gridLines: state.forms.ui.patientDashboard.showGridLines.value,
});

export const MetabolicConnector = createStructuredSelector({
  verticalLabel: selectVerticalLabel,
  verticalTicks: selectMetabolicVerticalTicks,
  verticalTicksDashboard: selectVerticalTicksDashboard,
  horizontalLabel: selectHorizontalLabel,
  horizontalTicks: selectHorizontalTicks,
  stabilityLabels: selectStabilityLabels,
  thresholds: selectThresholds,
  graphDetails: selectGraphStatistics,
  graphData: selectFilteredMetabolicGraphData,
  meanBGSD: selectMeanBGSD,
  sd1: selectSD1,
  toggles: selectToggles,
  isLoading: selectGraphLoading,
});

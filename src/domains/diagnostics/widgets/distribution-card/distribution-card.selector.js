import { createStructuredSelector, createSelector } from 'reselect';
import { compose, isEmpty } from 'ramda';

import { colors } from 'src/domains/diagnostics/styles';
import {
  selectIsLoading,
  selectGlucoseMeasurementsInDateSliderRange,
  selectGraphThreshold,
  selectGraphDetailTargetRanges,
} from 'src/domains/diagnostics/store/selectors';
import { addEmptyFillerRadialSegmentWhenValuesZero } from 'src/domains/diagnostics/utils/graphs.util';

import { returnZeroIfEmptyValueOrDivideBy100 } from './distribution-card.selector.util';

const mapGraphDetailToDistribution = ({
  abovePercentage,
  withinPercentage,
  belowPercentage,
  hypoglycaemiaPercentage,
}) => ({
  above: returnZeroIfEmptyValueOrDivideBy100(abovePercentage),
  within: returnZeroIfEmptyValueOrDivideBy100(withinPercentage),
  below: returnZeroIfEmptyValueOrDivideBy100(belowPercentage),
  hypoglycaemia: returnZeroIfEmptyValueOrDivideBy100(hypoglycaemiaPercentage),
});

const mapDistributionToDistributionSegments = ({
  above,
  within,
  below,
  hypoglycaemia,
}) => [
  {
    name: 'above-segment',
    fill: colors.blueLight,
    value: above,
  },
  {
    name: 'within-segment',
    fill: colors.trafficGreen,
    value: within,
  },
  {
    name: 'below-segment',
    fill: colors.trafficOrange,
    value: below,
  },
  {
    name: 'hypoglycaemia-segment',
    fill: colors.red,
    value: hypoglycaemia,
  },
];

const selectDistribution = createSelector(
  selectGraphDetailTargetRanges,
  mapGraphDetailToDistribution,
);

const selectDistributionSegments = createSelector(
  selectDistribution,
  compose(
    addEmptyFillerRadialSegmentWhenValuesZero,
    mapDistributionToDistributionSegments,
  ),
);

const selectHasData = createSelector(
  selectGlucoseMeasurementsInDateSliderRange,
  selectIsLoading,
  (measurements, isLoading) => isLoading || !isEmpty(measurements),
);

export const DistributionCardConnector = createStructuredSelector({
  distribution: selectDistribution,
  distributionSegments: selectDistributionSegments,
  threshold: selectGraphThreshold,
  hasData: selectHasData,
  isLoading: selectIsLoading,
});

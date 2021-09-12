import { compose, isEmpty } from 'ramda';
import { createSelector, createStructuredSelector } from 'reselect';

import {
  selectIsLoading,
  selectTimePoweredOn,
  selectBolusTotalInDateSliderRange,
  selectBolusPlusBasalTotalInDateSliderRange,
} from 'src/domains/diagnostics/store/selectors';
import { colors } from 'src/domains/diagnostics/styles';
import { MINUTES_IN_DAY } from 'src/domains/diagnostics/store/constants';
import { addEmptyFillerRadialSegmentWhenValuesZero } from 'src/domains/diagnostics/utils';

export const selectAvgBolusBasalPerDay = createSelector(
  selectBolusTotalInDateSliderRange,
  selectBolusPlusBasalTotalInDateSliderRange,
  selectTimePoweredOn,
  (totalBolus, totalBolusPlusBasal, timePoweredOn) => {
    const totalBolusPlusBasalVal = totalBolusPlusBasal.reduce(
      (acc, curr) => acc + curr.bolusValue,
      0,
    );

    const totalBolusVal = totalBolus.reduce(
      (acc, curr) => acc + curr.bolusValue,
      0,
    );

    const totalBolusAvg = (MINUTES_IN_DAY / timePoweredOn) * totalBolusVal;

    const totalBasalAvg =
      (MINUTES_IN_DAY / timePoweredOn) *
      (totalBolusPlusBasalVal - totalBolusVal);

    return {
      totalAvg: totalBolusAvg + totalBasalAvg,
      totalBolusAvg,
      totalBasalAvg,
    };
  },
);

const mapAvgBolusBasalPerDayToAvgBolusBasalPerDaySegments = ({
  totalAvg,
  totalBolusAvg,
  totalBasalAvg,
}) => [
  {
    name: 'totalBasalAvg-segment',
    value: totalBasalAvg / totalAvg || 0,
    fill: colors.blueMarine,
  },
  {
    name: 'totalBolusAvg-segment',
    value: totalBolusAvg / totalAvg || 0,
    fill: colors.basalBlue,
  },
];

const selectAvgBolusBasalPerDaySegments = createSelector(
  selectAvgBolusBasalPerDay,
  compose(
    addEmptyFillerRadialSegmentWhenValuesZero,
    mapAvgBolusBasalPerDayToAvgBolusBasalPerDaySegments,
  ),
);

const selectHasNoData = createSelector(
  selectBolusTotalInDateSliderRange,
  selectBolusPlusBasalTotalInDateSliderRange,
  selectIsLoading,
  (totalBolus, totalBolusPlusBasal, isLoading) =>
    !isLoading && isEmpty(totalBolus) && isEmpty(totalBolusPlusBasal),
);

export const insulinDetailsConnector = createStructuredSelector({
  hasNoData: selectHasNoData,
  avgBolusBasalPerDay: selectAvgBolusBasalPerDay,
  avgBolusBasalPerDaySegments: selectAvgBolusBasalPerDaySegments,
  isLoading: selectIsLoading,
});

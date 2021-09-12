import { createSelector, createStructuredSelector } from 'reselect';
import { flatten, pipe, sort } from 'ramda';

import { toFormat, toDayOfWeekNumFormat } from 'src/domains/diagnostics/utils';
import {
  groupMeasurementsByDate,
  sortTwoMeasurementsByAscendingDate,
} from 'src/domains/diagnostics/utils/time.util';
import { getBolusTypeIcon } from 'src/domains/diagnostics/scenes/graphs/graph.util';
import {
  selectGlucoseMeasurementsIncludingNullValuesInDateSliderRange,
  selectTimeIntervals,
  selectGraphThreshold,
  selectBolusesInDateSliderRange,
  selectBasalsInDateSliderRange,
  selectGraphLoading,
} from 'src/domains/diagnostics/store/selectors';
import { toFormatWithLocale } from 'src/utils';
import { TIME_FORMAT_24_HOURS } from 'src/domains/diagnostics/constants';

import {
  getBasalRateProfile,
  getGlucoseIcons,
  getPumpIcon,
  getTextAfterPumpIcon,
  getTextBeforePumpIcon,
  reduceIndexed,
  getBolusValue,
} from './logbook-diary.util';

export const selectLogbookDiaryData = createSelector(
  selectGlucoseMeasurementsIncludingNullValuesInDateSliderRange,
  selectBolusesInDateSliderRange,
  selectBasalsInDateSliderRange,
  selectTimeIntervals,
  selectGraphThreshold,
  (measurements, boluses, basals, timeIntervals, thresholds) => {
    const flattenedMeasurements = flatten([measurements, basals, boluses]);

    return pipe(
      sort(sortTwoMeasurementsByAscendingDate),
      reduceIndexed(
        (acc, measurement, index) => [
          ...acc,
          {
            date: toFormatWithLocale('cccc, MMM d, yyyy')(measurement.date),
            dateLine1: toFormatWithLocale('cccc,')(measurement.date),
            dateLine2: toFormatWithLocale('MMM d, yyyy')(measurement.date),
            time: toFormat(TIME_FORMAT_24_HOURS)(
              measurement.date,
            ).toLowerCase(),
            dayOfWeek: toDayOfWeekNumFormat(measurement.date),
            glucoseValue: measurement.value,
            aboveTargetRange:
              measurement.value > thresholds.glucoseIdealIntervalMax,
            belowTargetRange:
              measurement.value < thresholds.glucoseIdealIntervalMin,
            hypoSymptoms: measurement.hypoSymptoms,
            glucoseIcons: getGlucoseIcons(measurement, thresholds),
            basalCbrf: measurement.basalCbrf,
            basalRateProfile: getBasalRateProfile(measurement, index, acc),
            basalRemark: measurement.basalRemark,
            basalTbrdec: measurement.basalTbrdec,
            basalTbrinc: measurement.basalTbrinc,
            pumpIcon: getPumpIcon(measurement),
            pumpTextBeforeIcon: getTextBeforePumpIcon(measurement),
            pumpTextAfterIcon: getTextAfterPumpIcon(measurement),
            bolusValue: getBolusValue(measurement),
            bolusRemark: measurement.bolusRemark,
            bolusRegisterType: measurement.bolusRegisterType,
            bolusTypeIcon:
              measurement.bolusType && getBolusTypeIcon(measurement),
            carbohydrates: measurement.carbohydrates,
          },
        ],
        [],
      ),
      groupMeasurementsByDate,
    )(flattenedMeasurements);
  },
);

export const logbookDiaryConnector = createStructuredSelector({
  logbookDiaryData: selectLogbookDiaryData,
  isLoading: selectGraphLoading,
});

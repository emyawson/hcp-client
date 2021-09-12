import { createSelector, createStructuredSelector } from 'reselect';
import { compose, isNil, isEmpty, equals, all, values } from 'ramda';

import { translate } from 'src/i18n'; // TODO: move to diagnostics
import { selectPatient } from 'src/domains/diagnostics/core/patient';
import { colors } from 'src/domains/diagnostics/styles';
import {
  selectBasalsInDateSliderRange,
  selectBolusesInDateSliderRange,
  selectAdvicedBolusInDateSliderRange,
  selectIsFetchingClinicalData,
  selectNumberOfDaysInDateSliderRange,
  selectBolusPerDay,
} from 'src/domains/diagnostics/store/selectors';
import { MINUTES_IN_DAY } from 'src/domains/diagnostics/store/constants';
import { addEmptyFillerRadialSegmentWhenValuesZero } from 'src/domains/diagnostics/utils';

import { PROFILE_TIMES_START } from './insulin.constant';

const reduceToMinutesByProfile = (minutesByDay, basal) => {
  const { date, basalRateProfile, basalCbrf } = basal;

  const currMinutes = date.hour * 60 + date.minute;
  const latestProfile = minutesByDay.latestProfile;

  let minutes;
  let currProfile = minutesByDay[latestProfile];
  let base = currMinutes === 0 || !currProfile ? 0 : minutesByDay.base;

  if (currProfile) {
    minutes =
      minutesByDay.latestVal === 0
        ? currProfile.minutes
        : currProfile.minutes + currMinutes - base;
  } else {
    minutes = 0;
  }

  base = currMinutes;

  return {
    ...minutesByDay,
    [latestProfile]: { ...minutesByDay[latestProfile], minutes },
    latestVal: basalCbrf,
    latestProfile: basalRateProfile,
    base,
  };
};

export const selectProfileMinutes = createSelector(
  selectBasalsInDateSliderRange,
  selectNumberOfDaysInDateSliderRange,
  (basals, numDays) => {
    const profileMinutes = basals.reduce(
      reduceToMinutesByProfile,
      PROFILE_TIMES_START,
    );

    const totalMinutes = MINUTES_IN_DAY * numDays;

    const stoppedMinutes =
      totalMinutes -
      (profileMinutes['1'].minutes +
        profileMinutes['2'].minutes +
        profileMinutes['3'].minutes +
        profileMinutes['4'].minutes +
        profileMinutes['5'].minutes);

    return { ...profileMinutes, stop: { minutes: stoppedMinutes } };
  },
);

export const selectAdvisedBolus = createSelector(
  selectBolusesInDateSliderRange,
  selectAdvicedBolusInDateSliderRange,
  selectNumberOfDaysInDateSliderRange,
  (boluses, advicedBoluses, numDays) => {
    const numAcceptedBolus = advicedBoluses.filter(
      advicedBolus =>
        advicedBolus && advicedBolus.recommended && !advicedBolus.selected,
    ).length;

    const numModifiedBolus = advicedBoluses.filter(
      advicedBolus =>
        advicedBolus && advicedBolus.recommended && advicedBolus.selected,
    ).length;

    const numUncalculatedBolus =
      boluses.length - (numAcceptedBolus + numModifiedBolus);

    return {
      acceptedAdvised: numAcceptedBolus,
      modifiedAdvised: numModifiedBolus,
      uncalculatedAdvised: numUncalculatedBolus,
      totalAdvised: boluses.length,
    };
  },
);

const mapAdvisedBolusToAdvisedBolusSegments = ({
  acceptedAdvised,
  modifiedAdvised,
  uncalculatedAdvised,
  totalAdvised,
}) => [
  {
    name: 'acceptedAdvised-segment',
    value: acceptedAdvised / totalAdvised || 0,
    fill: colors.blueMarine,
  },
  {
    name: 'modifiedAdvised-segment',
    value: modifiedAdvised / totalAdvised || 0,
    fill: colors.basalBlue,
  },
  {
    name: 'uncalculatedAdvised-segment',
    value: uncalculatedAdvised / totalAdvised || 0,
    fill: colors.silverMedium,
  },
];

const selectAdvisedBolusSegments = createSelector(
  selectAdvisedBolus,
  compose(
    addEmptyFillerRadialSegmentWhenValuesZero,
    mapAdvisedBolusToAdvisedBolusSegments,
  ),
);

export const selectBolusTableData = createSelector(
  selectBolusPerDay,
  ({
    numStdBolusPerDay,
    numQuickBolusPerDay,
    numExtendedBolusPerDay,
    numMultiwaveBolusPerDay,
    totalPerDay,
  }) => [
    {
      bolus: totalPerDay > 0 ? numStdBolusPerDay / totalPerDay : 0,
      remoteBolus: 0,
      numberOfBolusesPerDay: numStdBolusPerDay,
    },
    {
      bolus: totalPerDay > 0 ? numQuickBolusPerDay / totalPerDay : 0,
      remoteBolus: 0,
      numberOfBolusesPerDay: numQuickBolusPerDay,
    },
    {
      bolus: totalPerDay > 0 ? numExtendedBolusPerDay / totalPerDay : 0,
      remoteBolus: 0,
      numberOfBolusesPerDay: numExtendedBolusPerDay,
    },
    {
      bolus: totalPerDay > 0 ? numMultiwaveBolusPerDay / totalPerDay : 0,
      remoteBolus: 0,
      numberOfBolusesPerDay: numMultiwaveBolusPerDay,
    },
  ],
);

const getTbrIncCountForProfile = (basals, profile) =>
  basals.filter(
    basal => !isNil(basal.basalTbrinc) && basal.basalRateProfile === profile,
  ).length;

const getTbrDecCountForProfile = (basals, profile) =>
  basals.filter(
    basal => !isNil(basal.basalTbrdec) && basal.basalRateProfile === profile,
  ).length;

export const selectBasalRateTableData = createSelector(
  selectBasalsInDateSliderRange,
  selectProfileMinutes,
  selectNumberOfDaysInDateSliderRange,
  (basals, profileMinutes, numDays) => {
    const totalMinutes = MINUTES_IN_DAY * numDays;

    return [
      {
        profileName: 1,
        profilePercentage: profileMinutes['1'].minutes / totalMinutes,
        tbrIncreases: getTbrIncCountForProfile(basals, '1'),
        tbrDecreases: getTbrDecCountForProfile(basals, '1'),
        basalRateChanges: 0,
      },
      {
        profileName: 2,
        profilePercentage: profileMinutes['2'].minutes / totalMinutes,
        tbrIncreases: getTbrIncCountForProfile(basals, '2'),
        tbrDecreases: getTbrDecCountForProfile(basals, '2'),
        basalRateChanges: 0,
      },
      {
        profileName: 3,
        profilePercentage: profileMinutes['3'].minutes / totalMinutes,
        tbrIncreases: getTbrIncCountForProfile(basals, '3'),
        tbrDecreases: getTbrDecCountForProfile(basals, '3'),
        basalRateChanges: 0,
      },
      {
        profileName: 4,
        profilePercentage: profileMinutes['4'].minutes / totalMinutes,
        tbrIncreases: getTbrIncCountForProfile(basals, '4'),
        tbrDecreases: getTbrDecCountForProfile(basals, '4'),
        basalRateChanges: 0,
      },
      {
        profileName: 5,
        profilePercentage: profileMinutes['5'].minutes / totalMinutes,
        tbrIncreases: getTbrIncCountForProfile(basals, '5'),
        tbrDecreases: getTbrDecCountForProfile(basals, '5'),
        basalRateChanges: 0,
      },
      {
        profileName: translate('graphs.insulin.stop'),
        profilePercentage: profileMinutes.stop.minutes / totalMinutes,
      },
    ];
  },
);

const isAllPropsZero = compose(
  all(equals(0)),
  values,
);

const selectHasData = createSelector(
  selectBasalsInDateSliderRange,
  selectAdvisedBolus,
  selectIsFetchingClinicalData,
  (basals, advisedBolus, isFetchingData) =>
    isFetchingData || !isEmpty(basals) || !isAllPropsZero(advisedBolus),
);

export const insulinConnector = createStructuredSelector({
  advisedBolus: selectAdvisedBolus,
  advisedBolusSegments: selectAdvisedBolusSegments,
  basalRateTableData: selectBasalRateTableData,
  bolusTableData: selectBolusTableData,
  patient: selectPatient,
  hasData: selectHasData,
  isLoading: selectIsFetchingClinicalData,
});

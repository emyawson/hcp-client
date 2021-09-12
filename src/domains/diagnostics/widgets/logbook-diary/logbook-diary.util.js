import { addIndex, filter, keys, pipe, reduce } from 'ramda';

import { fixToDecimalPlace } from 'src/domains/diagnostics/utils';

import { BASAL_REMARKS, PUMP_ICONS } from './logbook-diary.constant';

export const basalRemarkMatchesRegexCondition = basalRemark => condition =>
  condition instanceof RegExp && condition.test(basalRemark);

export const getBasalRateProfile = (
  measurement,
  index,
  listOfMeasurementsWithUpdatedBasalRateProfile,
) => {
  const {
    RUN,
    TBR_END,
    STOP,
    POWER_UP,
    POWER_UP_TIME_SHIFT_BACK,
    POWER_DOWN,
    TBR_END_CANCELLED,
    TIME_DATE_SET,
    TIME_DATE_SET_TIME_SHIFT_BACK,
    TIME_DATE_CORRECTED,
    PAUSE_ON_PAUSE_OFF,
    NULL,
    DUR_HH_MM_H,
    CHANGED_PROFILE,
  } = BASAL_REMARKS;

  const basalRateProfileConditions = {
    profile: [RUN, TBR_END, PAUSE_ON_PAUSE_OFF, DUR_HH_MM_H, CHANGED_PROFILE],
    empty: [STOP, POWER_UP, POWER_UP_TIME_SHIFT_BACK, POWER_DOWN],
    rowAbove: [
      TBR_END_CANCELLED,
      TIME_DATE_SET,
      TIME_DATE_SET_TIME_SHIFT_BACK,
      TIME_DATE_CORRECTED,
      NULL,
    ],
  };

  const basalRateProfileInRowAbove =
    index === 0
      ? undefined
      : listOfMeasurementsWithUpdatedBasalRateProfile[index - 1]
          .basalRateProfile;

  if (
    basalRateProfileConditions.profile.filter(
      basalRemarkMatchesRegexCondition(measurement.basalRemark),
    ).length === 1 ||
    basalRateProfileConditions.profile.includes(measurement.basalRemark)
  ) {
    return measurement.basalRateProfile;
  } else if (
    basalRateProfileConditions.empty.includes(measurement.basalRemark)
  ) {
    return undefined;
  } else if (
    basalRateProfileConditions.rowAbove.includes(measurement.basalRemark) ||
    typeof measurement.basalRemark === 'undefined'
  ) {
    return basalRateProfileInRowAbove;
  }
};

export const getGlucoseIcons = (
  { value, hypoSymptoms, beforeMeal, afterMeal },
  { hypoglycemiaThreshold },
) => {
  const allIcons = {
    hypo: value && value < hypoglycemiaThreshold,
    hypoSymptoms,
    beforeMeal,
    afterMeal,
  };

  const icons = pipe(
    filter(icon => icon),
    keys,
  )(allIcons);

  const spaces = Array.from({
    length: 5 - icons.length,
  });

  return icons.concat(spaces);
};

export const getPumpIconIdentifier = (
  basalRemark,
  basalTbrdec,
  basalTbrinc,
) => {
  if (
    basalRemarkMatchesRegexCondition(basalRemark)(BASAL_REMARKS.CHANGED_PROFILE)
  ) {
    return 'changedProfile';
  } else if (basalRemark === 'Run') {
    return 'run';
  } else if (basalRemark === 'Stop') {
    return 'stop';
  } else if (basalRemark === 'TBR End') {
    // TODO: confirm how to determine if end of tbr inc or tbr dec, then return tbrEndInc or tbrEndDec respectively
    return 'tbrEndInc';
  } else if (basalRemark === 'TBR End (cancelled)') {
    return 'tbrEndInc';
    // TODO: confirm how to determine if end of tbr inc or tbr dec, then return tbrEndInc or tbrEndDec respectively
  } else if (basalRemark === 'power up') {
    return 'powerUp';
  } else if (basalRemark === 'power down') {
    return 'powerDown';
  } else if (
    basalRemark === 'pause on / pause off' ||
    basalRemark === 'Pause'
  ) {
    return 'pauseOnPauseOff';
  } else if (basalTbrdec) {
    return 'tbrdec';
  } else if (basalTbrinc) {
    return 'tbrinc';
  }
};

export const getPumpIcon = ({ basalRemark, basalTbrdec, basalTbrinc }) => {
  const pumpIconIdentifier = getPumpIconIdentifier(
    basalRemark,
    basalTbrdec,
    basalTbrinc,
  );

  const pumpIcons = {
    tbrinc: PUMP_ICONS.TBR_INC,
    tbrdec: PUMP_ICONS.TBR_DEC,
    changedProfile: PUMP_ICONS.CHANGED_PROFILE,
    run: PUMP_ICONS.RUN,
    stop: PUMP_ICONS.STOP,
    tbrEndInc: PUMP_ICONS.TBR_END_INC,
    tbrEndDec: PUMP_ICONS.TBR_END_DEC,
    powerUp: PUMP_ICONS.POWER_UP,
    powerDown: PUMP_ICONS.POWER_DOWN,
    pauseOnPauseOff: PUMP_ICONS.PAUSE,
  };

  return pumpIcons[pumpIconIdentifier];
};

export const getTextBeforePumpIcon = ({ basalRemark }) => {
  if (
    basalRemarkMatchesRegexCondition(basalRemark)(BASAL_REMARKS.CHANGED_PROFILE)
  ) {
    return basalRemark[0];
  }
};

export const getTextAfterPumpIcon = ({
  basalRemark,
  basalTbrdec,
  basalTbrinc,
}) => {
  if (
    basalRemarkMatchesRegexCondition(basalRemark)(BASAL_REMARKS.CHANGED_PROFILE)
  ) {
    return basalRemark[4];
  } else if (basalTbrinc) {
    return basalTbrinc;
  } else if (basalTbrdec) {
    return basalTbrdec;
  }
};

export const reduceIndexed = addIndex(reduce);

export const getBolusValue = measurement =>
  measurement.bolusValue != null
    ? fixToDecimalPlace(measurement.bolusValue, 1)
    : measurement.insulin1
      ? fixToDecimalPlace(measurement.insulin1, 1)
      : undefined;

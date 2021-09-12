import { isNil } from 'ramda';
import moment from 'moment/min/moment-with-locales';

export const toMomentGMT = date => moment(date).utc(); // arg is optional: moment(undefined) === moment()

export const presets = [
  {
    endDate: toMomentGMT(),
    label: 'datePicker.presets.today',
    startDate: toMomentGMT(),
  },
  {
    endDate: toMomentGMT().subtract(1, 'day'),
    label: 'datePicker.presets.yesterday',
    startDate: toMomentGMT().subtract(1, 'day'),
  },
  {
    endDate: toMomentGMT(),
    label: 'datePicker.presets.last7Days',
    startDate: toMomentGMT().subtract(6, 'day'),
  },
  {
    endDate: toMomentGMT(),
    label: 'datePicker.presets.last30Days',
    startDate: toMomentGMT().subtract(29, 'day'),
  },
  {
    endDate: toMomentGMT(),
    label: 'datePicker.presets.thisMonth',
    startDate: toMomentGMT().startOf('month'),
  },
  {
    endDate: toMomentGMT()
      .subtract(1, 'month')
      .endOf('month'),
    label: 'datePicker.presets.lastMonth',
    startDate: toMomentGMT()
      .subtract(1, 'month')
      .startOf('month'),
  },
];

const isSameGranularity = (momentDate1, momentDate2, granularity) =>
  !momentDate1 ? false : momentDate1.isSame(momentDate2, granularity);

export const isPresetButtonActive = (state, preset): boolean =>
  isSameGranularity(state.startDate, preset.startDate, 'day') &&
  isSameGranularity(state.startDate, preset.startDate, 'month') &&
  isSameGranularity(state.startDate, preset.startDate, 'year') &&
  isSameGranularity(state.endDate, preset.endDate, 'day') &&
  isSameGranularity(state.endDate, preset.endDate, 'month') &&
  isSameGranularity(state.endDate, preset.endDate, 'year');

export const isCustomActive = (state): boolean =>
  presets.every(preset => !isPresetButtonActive(state, preset));

export const dateOrNull = date => (isNil(date) ? null : date);
export const momentOrNull = date => (isNil(date) ? null : toMomentGMT(date));

export const isDatePastToday = (date, lastDate) => {
  const boundDate = lastDate || new Date();
  return (
    date.toDate() >
    moment(boundDate)
      .endOf('day')
      .toDate()
  );
};

export const checkIfDateOutOfRange = (date, earliestDate, lastDate) => {
  let mDate = moment(date) || moment();
  return (
    mDate.isBefore(moment(earliestDate)) || mDate.isAfter(moment(lastDate))
  );
};

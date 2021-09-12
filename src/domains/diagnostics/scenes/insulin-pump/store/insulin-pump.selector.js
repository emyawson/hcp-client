import { createSelector, createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import { sort, mergeDeepRight, isEmpty } from 'ramda';

import { selectIsLoading } from 'src/domains/diagnostics/store/selectors/diagnostics.selector';
import { groupObjectsByGMTDate } from 'src/domains/diagnostics/utils';
import { toFormat, compareAsc } from 'src/domains/diagnostics/utils';
import {
  createBolusObject,
  getBolusTypeIcon,
} from 'src/domains/diagnostics/scenes/graphs/graph.util';
import { BASAL_RATE_PLUS_BOLUS } from 'src/domains/diagnostics/scenes/graphs';
import { selectBolusesDataInDateSliderRange } from 'src/domains/diagnostics/store/selectors';

import { EMPTY_ICON } from './insulin-pump.constant';

import { TIME_FORMAT_24_HOURS } from '../../../constants/diagnostics.constants';

const compareGroupsDateAsc = (a, b) => compareAsc(a.date, b.date);

const formatGroupDate = groups =>
  groups.map(group => {
    const date = toFormat('cccc, LLL d, yyyy')(group.date);
    return { ...group, date };
  });

const formatBolusesDate = groups =>
  groups.map(group => {
    const boluses = group.boluses.map(bolus => {
      const time =
        bolus.date != null ? toFormat(TIME_FORMAT_24_HOURS)(bolus.date) : '';
      return { ...bolus, time };
    });

    return { ...group, boluses };
  });

const formatBolusPlusBasalTotal = groups =>
  groups.map(group => {
    const text = `${group.daysTotal.comment.text} U`;
    return mergeDeepRight(group, { daysTotal: { comment: { text } } });
  });
const reduceToHigherBolusValue = (acc, object) =>
  object.bolusValue > acc ? object.bolusValue : acc;

const getGroupBolusTotal = group =>
  createBolusObject('BolusTotal')(group).reduce(reduceToHigherBolusValue, 0);

const getGroupBolusPlusBasilTotal = group =>
  createBolusObject('BolusPlusBasalTotal')(group).reduce(
    reduceToHigherBolusValue,
    0,
  );

const convertBolusTypes = bolus => {
  const bolusType = getBolusTypeIcon(bolus);
  return { ...bolus, types: [bolusType] };
};

const makeGroupWithEmptyBolus = () => [
  {
    date: null,
    types: [EMPTY_ICON],
    bolusValue: '0',
    bolusRemark: '',
    bolusRegisterType: '',
    bolusType: '',
  },
];

const getGroupBoluses = group => {
  const boluses = createBolusObject('Bolus')(group)
    .sort(compareGroupsDateAsc)
    .map(convertBolusTypes);
  return boluses.length !== 0 ? boluses : makeGroupWithEmptyBolus();
};

const toGroupShape = groups =>
  groups.map(group => {
    const boluses = getGroupBoluses(group);
    const bolusTotal = getGroupBolusTotal(group);
    const bolusPlusBasalTotal = getGroupBolusPlusBasilTotal(group);
    const date = group[0].date;
    const isWeekend = date.weekday === 6 || date.weekday === 7;

    return {
      date,
      boluses,
      isWeekend,
      daysTotal: {
        bolusTotal,
        comment: {
          text: bolusPlusBasalTotal,
          types: [BASAL_RATE_PLUS_BOLUS],
        },
      },
    };
  });

const selectBolusesDataGroupsByDay = createSelector(
  selectBolusesDataInDateSliderRange,
  compose(
    toGroupShape,
    groupObjectsByGMTDate,
  ),
);

const selectBolusesSortedGroup = createSelector(
  selectBolusesDataGroupsByDay,
  sort(compareGroupsDateAsc),
);

const selectFormattedBolusesGroups = createSelector(
  selectBolusesSortedGroup,
  compose(
    formatBolusPlusBasalTotal,
    formatBolusesDate,
    formatGroupDate,
  ),
);

const selectHasData = createSelector(
  selectFormattedBolusesGroups,
  selectIsLoading,
  (daysData, isLoading) => isLoading || !isEmpty(daysData),
);

export const insulinPumpConnector = createStructuredSelector({
  daysData: selectFormattedBolusesGroups,
  hasData: selectHasData,
  isLoading: selectIsLoading,
});

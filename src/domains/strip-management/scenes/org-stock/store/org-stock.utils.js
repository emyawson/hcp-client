import {
  assocPath,
  map,
  pipe,
  sort,
  last,
  propOr,
  ifElse,
  isNil,
  always,
} from 'ramda';

import {
  formatDateString,
  isBefore,
  hasSame,
  convertISO,
  jsDateToISOString,
  toJSDate,
  translateDate,
} from 'src/utils';

export const formatHistoryDateString = dateString =>
  formatDateString({
    dateString,
    format: 'LLLL d yyyy',
  });
export const replaceStripHistoryDateTime = stripHistory =>
  assocPath(
    ['lastShipmentDate'],
    translateDate(formatHistoryDateString(stripHistory.lastShipmentDate)),
    stripHistory,
  );
export const formatOrgStockHistoryDates = map(replaceStripHistoryDateTime);

const compareDates = (d1, d2) =>
  hasSame('hours', d1, d2) ? 0 : isBefore(d1, d2) ? -1 : 1;
const sortByDateAscending = sort(compareDates);
const stripModelToDateTimeLastAddedDate = pipe(
  propOr(null, 'lastShipmentDate'),
  convertISO,
);
const dateTimeToISOString = ifElse(
  isNil,
  always(null),
  pipe(
    toJSDate,
    jsDateToISOString,
  ),
);
export const findMostRecentLastAddedDate = pipe(
  map(stripModelToDateTimeLastAddedDate),
  sortByDateAscending,
  last,
  dateTimeToISOString,
);

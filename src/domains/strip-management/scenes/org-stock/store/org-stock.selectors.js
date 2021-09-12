import { createSelector, createStructuredSelector } from 'reselect';
import { values, map, pipe } from 'ramda';

import {
  selectClinicId,
  selectDepartmentId,
  selectOrgStripModels,
  selectOrgStripModelStocks,
  selectOrgAggregateStripStock,
  numberOfStripsToTubes,
} from 'src/core';
import { formatDateString, toLocaleString, translateDate } from 'src/utils';
import { translate } from 'src/i18n';

import {
  formatOrgStockHistoryDates,
  findMostRecentLastAddedDate,
} from './org-stock.utils';

const noDataAvailable = '-';

const toLocaleNumberString = number =>
  number ? toLocaleString('en')(number) : noDataAvailable;

const stripModelToDropdownOption = ({ id, name }) => ({
  value: id,
  label: name,
});

const selectStripModelDropdownOptions = createSelector(
  selectOrgStripModels,
  map(stripModelToDropdownOption),
);

const numberOfStripsToTubesDisplay = pipe(
  numberOfStripsToTubes,
  toLocaleNumberString,
);

const selectAggregateStripStockDisplay = createSelector(
  selectOrgAggregateStripStock,
  toLocaleNumberString,
);

const selectAggregateTubeStockDisplay = createSelector(
  selectOrgAggregateStripStock,
  numberOfStripsToTubesDisplay,
);

export const selectAggregateLastShipmentDate = createSelector(
  selectOrgStripModelStocks,
  pipe(
    values,
    findMostRecentLastAddedDate,
    date =>
      translateDate(
        formatDateString({
          dateString: date,
          errorString: translate('orgStock.empty.default'),
          format: 'LLLL d yyyy',
        }),
      ),
  ),
);
const addStripsAndTubesDisplays = model => ({
  ...model,
  currentStripStock: toLocaleNumberString(model.currentStripStock),
  currentTubeStock: numberOfStripsToTubesDisplay(model.currentStripStock),
  lastShipmentNumberOfStripsReceived: toLocaleNumberString(
    model.lastShipmentNumberOfStripsReceived,
  ),
  lastShipmentNumberOfTubesReceived: numberOfStripsToTubesDisplay(
    model.lastShipmentNumberOfStripsReceived,
  ),
});

const selectStripModelStockAndHistory = createSelector(
  selectOrgStripModelStocks,
  pipe(
    formatOrgStockHistoryDates,
    map(addStripsAndTubesDisplays),
    values,
  ),
);

const selectOrgAggregateStockDetails = createSelector(
  selectAggregateStripStockDisplay,
  selectAggregateTubeStockDisplay,
  selectAggregateLastShipmentDate,
  (strips, tubes, lastShipment) => ({
    stripStock: strips,
    tubeStock: tubes,
    lastShipmentDate: lastShipment,
  }),
);

export const orgStockConnector = createStructuredSelector({
  stripModelStockAndHistory: selectStripModelStockAndHistory,
  clinicId: selectClinicId,
  departmentId: selectDepartmentId,
  stripModels: selectStripModelDropdownOptions,
  aggregateStock: selectOrgAggregateStockDetails,
});

import React from 'react';

import { translate } from 'src/i18n';

import { StripStockRow } from './strip-stock-row';

import { HistoryHeader } from '../history-header';

export const OrgStockHistory = ({ stripModelStockAndHistory }) => (
  <React.Fragment>
    <HistoryHeader>{translate('orgStock.orgStockHistory.title')}</HistoryHeader>
    {stripModelStockAndHistory.map(
      ({
        id,
        name,
        lastShipmentDate,
        lastShipmentNumberOfStripsReceived,
        lastShipmentNumberOfTubesReceived,
        currentStripStock,
        currentTubeStock,
      }) => (
        <StripStockRow
          key={id}
          dateAdded={lastShipmentDate}
          id={id}
          name={name}
          tubeStock={lastShipmentNumberOfTubesReceived}
          unitStock={lastShipmentNumberOfStripsReceived}
          totalTubeStock={currentTubeStock}
          totalStripStock={currentStripStock}
        />
      ),
    )}
  </React.Fragment>
);

import React from 'react';

import { TableRow } from 'src/domains/diagnostics/components';
import { translate } from 'src/i18n';

import { DistributionTableHeaderWrapper } from './distribution-table-header.style';

import { DistributionTableCell } from '../distribution-table-row';

export const DistributionTableHeader = ({ threshold }) => (
  <DistributionTableHeaderWrapper>
    <TableRow>
      <DistributionTableCell textAlign="left">
        {translate('dashboard.distributionCard.statsTable.targetRange')}
      </DistributionTableCell>
      <DistributionTableCell textAlign="right">
        {`${threshold.glucoseIdealIntervalMin} - ${
          threshold.glucoseIdealIntervalMax
        } ${translate('general.units.mgPerDL')}`}
      </DistributionTableCell>
    </TableRow>
  </DistributionTableHeaderWrapper>
);

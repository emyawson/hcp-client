import React from 'react';

import { fontSize } from 'src/domains/diagnostics/styles';
import { translate } from 'src/i18n'; // TODO: move to diagnostics

import {
  DistributionTableRowWrapper,
  IconTableCell,
  StatBadge,
  DistributionTableCell,
} from './distribution-table-row.style';

export const DistributionTableRow = ({ textKey, color, value }) => (
  <DistributionTableRowWrapper>
    <DistributionTableCell textAlign="left">
      <IconTableCell>
        <StatBadge color={color} />
        {translate(`dashboard.distributionCard.statsTable.${textKey}`)}
      </IconTableCell>
    </DistributionTableCell>
    <DistributionTableCell textAlign="right" fontSize={fontSize.subheading}>
      <span>{Math.round(value * 100)}%</span>
    </DistributionTableCell>
  </DistributionTableRowWrapper>
);

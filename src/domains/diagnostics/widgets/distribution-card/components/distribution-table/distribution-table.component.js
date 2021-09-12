import React from 'react';

import { Table } from 'src/domains/diagnostics/components';
import { colors } from 'src/domains/diagnostics/styles';

import { DistributionTableBody } from './distribution-table.style';

import { DistributionTableHeader } from '../distribution-table-header';
import { DistributionTableRow } from '../distribution-table-row';

export const DistributionTable = ({ threshold, distribution }) => (
  <Table>
    <DistributionTableHeader threshold={threshold} />
    <DistributionTableBody>
      <DistributionTableRow
        textKey="above"
        color={colors.blueLight}
        value={distribution.above}
      />
      <DistributionTableRow
        textKey="within"
        color={colors.trafficGreen}
        value={distribution.within}
      />
      <DistributionTableRow
        textKey="below"
        color={colors.trafficOrange}
        value={distribution.below}
      />
      <DistributionTableRow
        textKey="hypoglycaemia"
        color={colors.red}
        value={distribution.hypoglycaemia}
      />
    </DistributionTableBody>
  </Table>
);

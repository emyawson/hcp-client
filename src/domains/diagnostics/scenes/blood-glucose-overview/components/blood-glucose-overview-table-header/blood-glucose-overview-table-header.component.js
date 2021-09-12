import React from 'react';

import { TableHeader, TableRow } from 'src/domains/diagnostics/components';
import { colors, spacing } from 'src/domains/diagnostics/styles';

import { Title } from './blood-glucose-table-header.style';

import { BloodGlucoseOverviewTableCell } from '../blood-glucose-overview-table-cell';

export const BloodGlucoseOverviewTableHeader = ({ title }) => (
  <TableHeader>
    <TableRow>
      <BloodGlucoseOverviewTableCell
        p={[spacing.three, spacing.two]}
        w="15rem"
        borderBottom={{
          color: colors.silver,
          size: '0.125rem',
          thick: true,
        }}
      >
        <Title color={colors.blueMarine}>{title}</Title>
      </BloodGlucoseOverviewTableCell>
      <BloodGlucoseOverviewTableCell
        borderBottom={{
          color: colors.silver,
          size: '0.125rem',
          thick: true,
        }}
      />
    </TableRow>
  </TableHeader>
);

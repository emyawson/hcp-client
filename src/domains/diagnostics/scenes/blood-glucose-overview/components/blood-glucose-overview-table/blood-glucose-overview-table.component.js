import React from 'react';

import { Table, TableBody } from 'src/domains/diagnostics/components';

import { BloodGlucoseOverviewTableHeader } from '../blood-glucose-overview-table-header';

export const BloodGlucoseOverviewTable = ({ children, title }) => (
  <Table borderRadius={'0.375rem'}>
    <BloodGlucoseOverviewTableHeader title={title} />
    <TableBody>{children}</TableBody>
  </Table>
);

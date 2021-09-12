import * as React from 'react';

import { FixedTable, LocalizedText, TableBody, TableRow } from 'src/components';

import {
  PatientTableHeader,
  ResultHeaderCell,
} from 'src/widgets/patient-search/components/search-results.style';

import { AssignPatientSearchTableProps } from './assign-patient-search.types';

const TABLE_COLUMNS = 12;
const calculateColumnWidth = (span: number): number => span / TABLE_COLUMNS;

export const AssignPatientSearchTable: React.StatelessComponent<
  AssignPatientSearchTableProps
> = ({ children }) => (
  <FixedTable>
    <PatientTableHeader>
      <TableRow>
        <ResultHeaderCell bold width={calculateColumnWidth(4)}>
          <LocalizedText textKey="patientSearch.table.name" />
        </ResultHeaderCell>
        <ResultHeaderCell bold width={calculateColumnWidth(2)}>
          <LocalizedText textKey="patientSearch.table.id" />
        </ResultHeaderCell>
        <ResultHeaderCell bold width={calculateColumnWidth(4)}>
          <LocalizedText textKey="patientSearch.table.birthDate" />
        </ResultHeaderCell>
        <ResultHeaderCell bold width={calculateColumnWidth(2)} />
      </TableRow>
    </PatientTableHeader>
    <TableBody>{children}</TableBody>
  </FixedTable>
);

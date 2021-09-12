import * as React from 'react';

import { FixedTable, TableRow, TableBody, LocalizedText } from 'src/components';

import { PatientTableHeader, ResultHeaderCell } from './search-results.style';

export const SearchResults = ({ children }) => (
  <FixedTable>
    <PatientTableHeader>
      <TableRow>
        <ResultHeaderCell bold width={2.5 / 12}>
          <LocalizedText textKey="patientSearch.table.name" />
        </ResultHeaderCell>
        <ResultHeaderCell bold width={2 / 12}>
          <LocalizedText textKey="patientSearch.table.id" />
        </ResultHeaderCell>
        <ResultHeaderCell bold width={2 / 12}>
          <LocalizedText textKey="patientSearch.table.birthDate" />
        </ResultHeaderCell>
        <ResultHeaderCell bold width={1.5 / 12}>
          <LocalizedText textKey="patientSearch.table.diabetesType" />
        </ResultHeaderCell>
        <ResultHeaderCell bold width={1.5 / 12}>
          <LocalizedText textKey="patientSearch.table.treatment" />
        </ResultHeaderCell>
        <ResultHeaderCell bold width={2.5 / 12} />
      </TableRow>
    </PatientTableHeader>
    <TableBody>{children}</TableBody>
  </FixedTable>
);

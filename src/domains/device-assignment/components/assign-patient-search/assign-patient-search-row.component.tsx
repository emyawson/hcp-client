import * as React from 'react';

import { Button } from 'src/components';
import { translate } from 'src/i18n';
import { ResultCell } from 'src/widgets/patient-search/components/search-results.style';

import {
  AssignPatientResultNameCell,
  AssignPatientTableRow,
} from './assign-patient-search.style';

import { AssignPatientSearchRowProps } from './assign-patient-search.types';

const TABLE_PLACEHOLDER = '-';

export const AssignPatientSearchRow: React.StatelessComponent<
  AssignPatientSearchRowProps
> = ({ fullName, id, healthCareSystemId, birthDate, onSelectPatient }) => (
  <AssignPatientTableRow onClick={onSelectPatient}>
    <AssignPatientResultNameCell>{fullName}</AssignPatientResultNameCell>
    <ResultCell>{healthCareSystemId}</ResultCell>
    <ResultCell>{birthDate ? birthDate : TABLE_PLACEHOLDER}</ResultCell>
    <ResultCell align="right">
      <Button label={translate('deviceAssignment.patientSearch.select')} />
    </ResultCell>
  </AssignPatientTableRow>
);

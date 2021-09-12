import React from 'react';

import { Link, Button, TableAltRow } from 'src/components';
import { translate } from 'src/i18n';

import { ResultCell } from './search-results.style';

export const ResultLink = ({ id, to, onClick }) => (
  <Link to={to} p={2} onClick={() => onClick(id)}>
    <Button label={translate('patientSearch.table.userInfo')} />
  </Link>
);

export const PatientRow = ({
  fullName,
  id,
  healthCareSystemId,
  birthDate,
  diabetesType,
  treatment,
  switchPatient,
}) => (
  <TableAltRow>
    <ResultCell>{fullName}</ResultCell>
    <ResultCell>{healthCareSystemId}</ResultCell>
    <ResultCell>{birthDate ? birthDate : '-'}</ResultCell>
    <ResultCell>{translate(`patientSearch.${diabetesType}`)}</ResultCell>
    <ResultCell>{treatment}</ResultCell>
    <ResultCell align="right">
      <ResultLink id={id} to={`/patients/${id}`} onClick={switchPatient} />
    </ResultCell>
  </TableAltRow>
);

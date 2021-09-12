import React from 'react';
import { isEmpty } from 'ramda';

import { Block, Card, LocalizedText } from 'src/domains/diagnostics/components';
import { RenderIf } from 'src/domains/diagnostics/utils';
import { formatDateString } from 'src/domains/diagnostics/utils/date';
import { withLoader } from 'src/domains/diagnostics/components/with-loader';

import { PatientSummaryBarDropdown } from './widgets/patient-summary-bar-dropdown.component';
import {
  PatientSummaryContainer,
  PatientSummaryItemsContainer,
  PatientSummaryDataPointBlock,
  PatientSummaryDataPointHeader,
  PatientSummaryDataPointContent,
  PatientSummaryDataPointName,
  PatientSummaryDataPointBlockName,
  PatientSummaryEditPatientBlock,
} from './patient-summary-bar.style';

const formatBirthDate = dateString =>
  formatDateString({
    dateString,
    format: 'dd/LL/yyyy',
  });

const PatientSummaryContainerWithLoader = withLoader({
  isLoading: 'patient',
  loaderProps: {
    flexibleHeight: true,
    infinite: true,
    size: 18,
    text: '',
  },
})(PatientSummaryContainer);

export const PatientSummaryBar = ({ patient, match }) => {
  const {
    firstName,
    surName,
    healthCareSystemId,
    dateOfBirth,
    diabetesType,
    treatmentName,
    centerName,
  } = patient;

  return (
    <RenderIf validate={!isEmpty(patient)}>
      <PatientSummaryContainerWithLoader patient={patient}>
        <RenderIf validate={firstName || surName}>
          <Block mr="auto">
            <PatientSummaryDataPointBlockName>
              <PatientSummaryDataPointName>
                {`${firstName} ${surName}`}
              </PatientSummaryDataPointName>
            </PatientSummaryDataPointBlockName>
          </Block>
        </RenderIf>

        <Card cardStyles={['noPadding']} minHeight="5.125rem" height="5.125rem">
          <PatientSummaryItemsContainer>
            <PatientSummaryDataPointBlock setSeparator={true}>
              <PatientSummaryDataPointHeader>
                <LocalizedText textKey="patient.idNumber" />
              </PatientSummaryDataPointHeader>
              <PatientSummaryDataPointContent>
                <RenderIf validate={healthCareSystemId}>
                  {healthCareSystemId}
                </RenderIf>
                <RenderIf validate={!healthCareSystemId}>-</RenderIf>
              </PatientSummaryDataPointContent>
            </PatientSummaryDataPointBlock>
            <PatientSummaryDataPointBlock setSeparator={true}>
              <PatientSummaryDataPointHeader>
                <LocalizedText textKey="patient.birthDate" />
              </PatientSummaryDataPointHeader>
              <PatientSummaryDataPointContent>
                <RenderIf validate={dateOfBirth}>
                  {formatBirthDate(dateOfBirth)}
                </RenderIf>
                <RenderIf validate={!dateOfBirth}>-</RenderIf>
              </PatientSummaryDataPointContent>
            </PatientSummaryDataPointBlock>
            <PatientSummaryDataPointBlock setSeparator={true}>
              <PatientSummaryDataPointHeader>
                <LocalizedText textKey="patient.diabetesType" />
              </PatientSummaryDataPointHeader>
              <PatientSummaryDataPointContent>
                <RenderIf validate={diabetesType}>
                  {`Type ${diabetesType}`}
                </RenderIf>
                <RenderIf validate={!diabetesType}>-</RenderIf>
              </PatientSummaryDataPointContent>
            </PatientSummaryDataPointBlock>
            <PatientSummaryDataPointBlock setSeparator={true}>
              <PatientSummaryDataPointHeader>
                <LocalizedText textKey="patient.treatmentName" />
              </PatientSummaryDataPointHeader>
              <PatientSummaryDataPointContent>
                <RenderIf validate={treatmentName}>{treatmentName}</RenderIf>
                <RenderIf validate={!treatmentName}>-</RenderIf>
              </PatientSummaryDataPointContent>
            </PatientSummaryDataPointBlock>
            <PatientSummaryDataPointBlock setSeparator={true}>
              <PatientSummaryDataPointHeader>
                <LocalizedText textKey="patient.treatmentCenter" />
              </PatientSummaryDataPointHeader>
              <PatientSummaryDataPointContent>
                <RenderIf validate={centerName}>{centerName}</RenderIf>
                <RenderIf validate={!centerName}>-</RenderIf>
              </PatientSummaryDataPointContent>
            </PatientSummaryDataPointBlock>
            <PatientSummaryEditPatientBlock setSeparator={true}>
              <PatientSummaryBarDropdown match={match} />
            </PatientSummaryEditPatientBlock>
          </PatientSummaryItemsContainer>
        </Card>
      </PatientSummaryContainerWithLoader>
    </RenderIf>
  );
};

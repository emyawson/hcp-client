import * as React from 'react';
import { DeviceIcon } from 'src/assets/icons/index';
import { LoadingMessage } from 'src/components';
import { GridContainer, GridItem } from 'src/components/grid-layout';
import { Button } from 'src/components/index';
import { LocalizedText } from 'src/components/localized-text';
import { colors } from 'src/core/styles';
import { translate } from 'src/i18n/index';
import { hasValue } from 'src/utils';
import { RenderIf } from 'src/utils/render-if';

import { AssignPatientSearchRow } from '../../components/assign-patient-search/assign-patient-search-row.component';
import { AssignPatientSearchTable } from '../../components/assign-patient-search/assign-patient-search-table.component';
import { constructDeviceName } from '../../device-assignment.utils';
import { AssignCreatePatientComponent } from '../assign-create-patient';
import {
  CancelButton,
  FooterWrapper,
  SerialNumber,
  SerialNumberLabel,
} from '../device-assignment/device-assignment.style';

import { AssignPatientSearchContainer } from './assign-patient-search/assign-patient-search.container';
import {
  AssignDeviceTitle,
  DeviceIconDiv,
  DeviceInfoDiv,
  DeviceNameHeader,
  DeviceSerialNumberDiv,
  SelectPatientComponentDiv,
} from './assign-patient-search/assign-patient-search.style';
import { SelectPatientProps } from './select-patient.types';

const DeviceInfo = ({ deviceInfo }) => (
  <DeviceInfoDiv>
    <DeviceIconDiv>
      <DeviceIcon
        height={100}
        fillColor={colors.white}
        strokeColor={colors.brandBlue}
      />
    </DeviceIconDiv>
    <DeviceNameHeader>{constructDeviceName(deviceInfo)}</DeviceNameHeader>
    <DeviceSerialNumberDiv>
      <SerialNumberLabel>
        {translate('deviceAssignment.confirmDevice.serialNumber')}
      </SerialNumberLabel>
      <SerialNumber>{deviceInfo && deviceInfo.serialNumber}</SerialNumber>
    </DeviceSerialNumberDiv>
  </DeviceInfoDiv>
);

const Footer = ({ onCancel, onGoBack }) => {
  return (
    <GridItem span={12}>
      <FooterWrapper>
        <CancelButton onClick={onCancel}>
          <LocalizedText textKey="deviceAssignment.cancel" />
        </CancelButton>
        <Button
          onClick={onGoBack}
          label={translate('deviceAssignment.back')}
          buttonStyle="secondary"
          mr={4}
        />
      </FooterWrapper>
    </GridItem>
  );
};

export const SelectPatientComponent: React.StatelessComponent<
  SelectPatientProps
> = ({
  onSelectPatient,
  searchResults,
  shouldDisplayCreatePatientView,
  toggleCreatePatientView,
  deviceInfo,
  onCancel,
  onGoBack,
  ...props
}) => {
  return (
    <SelectPatientComponentDiv>
      <GridContainer columns={12}>
        <RenderIf validate={!shouldDisplayCreatePatientView}>
          <GridItem span={12}>
            <AssignDeviceTitle>
              <LocalizedText textKey="deviceAssignment.patientSearch.title" />
            </AssignDeviceTitle>
          </GridItem>
          <GridItem span={12}>
            <GridContainer columns={12}>
              <GridItem span={3}>
                <DeviceInfo deviceInfo={deviceInfo} />
              </GridItem>
              <GridItem span={9}>
                <AssignPatientSearchContainer />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem span={12}>
            <RenderIf validate={hasValue(searchResults)}>
              <AssignPatientSearchTable>
                {searchResults.map(
                  ({ fullName, id, birthDate, healthCareSystemId }) => (
                    <AssignPatientSearchRow
                      birthDate={birthDate}
                      fullName={fullName}
                      healthCareSystemId={healthCareSystemId}
                      id={id}
                      key={`AssignPatientResult-${id}`}
                      onSelectPatient={() => onSelectPatient(id)}
                    />
                  ),
                )}
              </AssignPatientSearchTable>
            </RenderIf>
            <RenderIf validate={!hasValue(searchResults)}>
              <LoadingMessage
                minHeight="400px"
                text={translate('requestsLoading.patientSearch')}
                infinite
              />
            </RenderIf>
          </GridItem>
        </RenderIf>
        <RenderIf validate={shouldDisplayCreatePatientView}>
          <GridItem span={12}>
            <AssignCreatePatientComponent
              toggleDisplayCreatePatientView={toggleCreatePatientView}
            />
          </GridItem>
        </RenderIf>
        <Footer onCancel={onCancel} onGoBack={onGoBack} />
      </GridContainer>
    </SelectPatientComponentDiv>
  );
};

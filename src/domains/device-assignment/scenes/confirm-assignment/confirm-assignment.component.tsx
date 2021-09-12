import * as React from 'react';
import { DeviceIcon, PatientSilhouetteIcon } from 'src/assets/icons';
import { PencilIcon } from 'src/assets/icons/pencil-icon';
import { Button, GridContainer, GridItem, LocalizedText } from 'src/components';
import { Block } from 'src/components/block';
import { colors } from 'src/core/styles';
import { translate } from 'src/i18n';

import { constructDeviceName } from '../../device-assignment.utils';
import {
  CancelButton,
  Content,
  ContentPanel,
  DeviceNameHeader,
  DeviceNumberTextDiv,
  FooterWrapper,
  HeaderWrapper,
  Hr,
  MediumIconWrapperDiv,
  PanelContentRightDiv,
  SerialNumber,
  SerialNumberLabel,
  SmallHr,
} from '../device-assignment/device-assignment.style';

import {
  ChangePatientButton,
  ChangePatientLabel,
  UnderlinedSubheaderDiv,
  UserInfoDetailDiv,
} from './confirm-assignment.style';
import { ConfirmAssignmentProps } from './confirm-assignment.types';

export const ConfirmAssignmentComponent: React.StatelessComponent<
  ConfirmAssignmentProps
> = ({
  deviceInfo,
  selectedPatient,
  onCancel,
  onConfirmAssignment,
  onChangePatient,
}) => (
  <GridContainer>
    <GridItem span={12}>
      <HeaderWrapper>
        <h2>
          <LocalizedText textKey="deviceAssignment.confirmDeviceAssignment.title" />
        </h2>
        <Hr />
      </HeaderWrapper>
    </GridItem>
    <Content>
      <ContentPanel span={6}>
        <UnderlinedSubheaderDiv>
          <LocalizedText textKey="deviceAssignment.confirmDeviceAssignment.deviceSubheader" />
        </UnderlinedSubheaderDiv>

        <Block display="flex">
          <MediumIconWrapperDiv>
            <DeviceIcon height={150} />
          </MediumIconWrapperDiv>

          <PanelContentRightDiv>
            <DeviceNameHeader>
              {constructDeviceName(deviceInfo)}
            </DeviceNameHeader>
            <SmallHr />
            <DeviceNumberTextDiv>
              <SerialNumberLabel>
                <LocalizedText textKey="deviceAssignment.serialNumber" />
              </SerialNumberLabel>
              <SerialNumber>{deviceInfo.serialNumber}</SerialNumber>
            </DeviceNumberTextDiv>
          </PanelContentRightDiv>
        </Block>
      </ContentPanel>
      <ContentPanel span={6}>
        <UnderlinedSubheaderDiv>
          <LocalizedText textKey="deviceAssignment.confirmDeviceAssignment.patientSubheader" />
          <ChangePatientButton onClick={onChangePatient}>
            <PencilIcon fillColor={colors.brandBlue} height={15} />
            <ChangePatientLabel>
              <LocalizedText textKey="deviceAssignment.confirmDeviceAssignment.changePatient" />
            </ChangePatientLabel>
          </ChangePatientButton>
        </UnderlinedSubheaderDiv>
        <Block display="flex">
          <MediumIconWrapperDiv>
            <PatientSilhouetteIcon />
          </MediumIconWrapperDiv>

          <PanelContentRightDiv>
            <DeviceNameHeader>{selectedPatient.fullName}</DeviceNameHeader>
            <SmallHr />
            <UserInfoDetailDiv>
              {`${translate(
                'deviceAssignment.confirmDeviceAssignment.patientIdNumber',
              )} ${selectedPatient.id}`}
            </UserInfoDetailDiv>
            <UserInfoDetailDiv>
              {`${translate(
                'deviceAssignment.confirmDeviceAssignment.dateOfBirth',
              )} ${selectedPatient.birthDate}`}
            </UserInfoDetailDiv>
          </PanelContentRightDiv>
        </Block>
      </ContentPanel>
    </Content>
    <GridItem span={12}>
      <FooterWrapper>
        <CancelButton onClick={onCancel}>
          <LocalizedText textKey="deviceAssignment.cancel" />
        </CancelButton>
        <Button
          onClick={onChangePatient}
          label={translate('deviceAssignment.back')}
          buttonStyle="secondary"
          fontWeight="bold"
          mr={4}
        />
        <Button
          onClick={onConfirmAssignment}
          label={translate(
            'deviceAssignment.confirmDeviceAssignment.confirmAssignDevice',
          )}
          fontWeight="bold"
        />
      </FooterWrapper>
    </GridItem>
  </GridContainer>
);

import * as React from 'react';
import { DeviceErrorIcon, XIcon } from 'src/assets/icons';
import { Badge, Block, Button } from 'src/components';
import { colors } from 'src/core';
import { translate } from 'src/i18n';

import { constructDeviceName } from '../../device-assignment.utils';
import {
  ContentLeft,
  ContentRight,
  DeviceAssignmentFeatureContent,
  DeviceAssignmentResultHr,
  DeviceAssignmentResultSubtitle,
  DeviceAssignmentResultTitle,
  DeviceErrorHeader,
  DeviceNameHeader,
  DeviceNumberText,
  FooterWrapper,
} from '../device-assignment/device-assignment.style';

import { ConfirmDeviceErrorProps } from './confirm-device-error.types';

export const ConfirmDeviceErrorComponent: React.StatelessComponent<
  ConfirmDeviceErrorProps
> = ({ onCancel, deviceInfo, associatedPatientName }) => {
  const device = constructDeviceName(deviceInfo);
  const deviceAssignedLabel = `${device} ${translate(
    'deviceAssignment.errors.deviceConfirmed.description',
  )}`;

  return (
    <div>
      <Block display="flex" justifyContent="center" mb={4}>
        <Badge
          bgColor={colors.trafficRed}
          emptyInnerCircle={false}
          size={72}
          icon={<XIcon height={28} />}
        />
      </Block>
      <Block textAlign="center" mb={5}>
        <DeviceAssignmentResultTitle>
          {translate('deviceAssignment.errors.deviceConfirmed.title')}
        </DeviceAssignmentResultTitle>
        <DeviceAssignmentResultHr />
        <DeviceAssignmentResultSubtitle>
          {deviceAssignedLabel} <strong>{associatedPatientName}</strong>
        </DeviceAssignmentResultSubtitle>
      </Block>
      <Block mb={5}>
        <DeviceAssignmentFeatureContent>
          <ContentLeft>
            <DeviceErrorIcon height={210} />
          </ContentLeft>
          <ContentRight>
            <DeviceErrorHeader>
              {translate('deviceAssignment.errors.deviceConfirmed.subheader')}
            </DeviceErrorHeader>
            <DeviceNameHeader>{device}</DeviceNameHeader>
            <DeviceNumberText>
              {translate('deviceAssignment.serialNumber')}{' '}
              {deviceInfo.serialNumber}
            </DeviceNumberText>
          </ContentRight>
        </DeviceAssignmentFeatureContent>
      </Block>

      <FooterWrapper>
        <Button
          onClick={onCancel}
          label={translate('deviceAssignment.cancel')}
          isCircleIcon={false}
          fontWeight="bold"
        />
      </FooterWrapper>
    </div>
  );
};

import * as React from 'react';

import { DeviceErrorIcon, XIcon } from 'src/assets/icons';
import { Badge, Block, Button } from 'src/components';
import { colors } from 'src/core';
import { translate } from 'src/i18n';

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

import { DeviceNotFoundErrorProps } from './device-not-found-error.types';

const defaultDeviceInfo = {
  brandName: translate('deviceAssignment.errors.unknown'),
  serialNumber: translate('deviceAssignment.errors.unknown'),
};
const defaultAssignedPatientName = translate('deviceAssignment.errors.unknown');

export const DeviceNotFoundErrorComponent: React.StatelessComponent<
  DeviceNotFoundErrorProps
> = ({
  onCancel,
  deviceInfo = defaultDeviceInfo,
  assignedPatientName = defaultAssignedPatientName,
}) => {
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
          {translate('deviceAssignment.errors.deviceNotFound.title')}
        </DeviceAssignmentResultTitle>
        <DeviceAssignmentResultHr />
        <DeviceAssignmentResultSubtitle>
          {translate('deviceAssignment.errors.deviceNotFound.description')}
        </DeviceAssignmentResultSubtitle>
      </Block>
      <Block mb={5}>
        <DeviceAssignmentFeatureContent>
          <ContentLeft>
            <DeviceErrorIcon height={210} />
          </ContentLeft>

          <ContentRight>
            <DeviceErrorHeader>
              {translate('deviceAssignment.errors.deviceNotFound.subheader')}
            </DeviceErrorHeader>
            <DeviceNameHeader>
              {translate('deviceAssignment.errors.deviceName')}
              : {deviceInfo.brandName}
            </DeviceNameHeader>
            <DeviceNumberText>
              {` ${translate('deviceAssignment.serialNumber')} ${
                deviceInfo.serialNumber
              }`}
            </DeviceNumberText>
          </ContentRight>
        </DeviceAssignmentFeatureContent>
      </Block>
      <FooterWrapper>
        <Button
          onClick={onCancel}
          label={translate('deviceAssignment.cancel')}
          isCircleIcon={false}
        />
      </FooterWrapper>
    </div>
  );
};

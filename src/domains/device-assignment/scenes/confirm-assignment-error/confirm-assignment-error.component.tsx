import * as React from 'react';

import {
  DeviceAssignmentErrorIcon,
  EmailIcon,
  PhoneIcon,
  XIcon,
} from 'src/assets/icons';
import { Badge, Block, Button } from 'src/components';
import { LocalizedText } from 'src/components/localized-text';
import { colors } from 'src/core/styles';
import { translate } from 'src/i18n';

import { constructDeviceNameWithSerial } from '../../device-assignment.utils';
import {
  DeviceAssignmentFeatureContent,
  DeviceAssignmentResultHr,
  DeviceAssignmentResultSubtitle,
  DeviceAssignmentResultTitle,
  FooterWrapperCentered,
} from '../device-assignment/device-assignment.style';

import {
  ConfirmAssignmentErrorHelpBlock,
  ConfirmAssignmentErrorHelpItem,
  ConfirmAssignmentErrorHelpSubheading,
  ConfirmAssignmentErrorHelpTitle,
  ConfirmAssignmentErrorHr,
} from './confirm-assignment-error.style';
import { ConfirmAssignmentErrorProps } from './confirm-assignment-error.types';

export const ConfirmAssignmentError: React.StatelessComponent<
  ConfirmAssignmentErrorProps
> = ({
  deviceInfo,
  email,
  onCancel,
  phone,
  selectedPatient,
  ...deviceAssignmentProps
}) => (
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
        <LocalizedText textKey="deviceAssignment.errors.deviceAssignmentFailed.title" />
      </DeviceAssignmentResultTitle>
      <DeviceAssignmentResultHr />
      <DeviceAssignmentResultSubtitle>
        <small>
          <LocalizedText textKey="deviceAssignment.errors.deviceAssignmentFailed.connect" />
          <em>{constructDeviceNameWithSerial(deviceInfo)}</em>
          {` ${translate(
            'deviceAssignment.errors.deviceAssignmentFailed.connectTo',
          )} `}
          <em>{selectedPatient.fullName}</em>
        </small>
      </DeviceAssignmentResultSubtitle>
    </Block>
    <Block mb={5}>
      <DeviceAssignmentFeatureContent>
        <Block textAlign="center" width="100%">
          <ConfirmAssignmentErrorHelpTitle>
            <LocalizedText textKey="deviceAssignment.errors.deviceAssignmentFailed.subheader" />
          </ConfirmAssignmentErrorHelpTitle>
          <Block mt={4} mb={4} py={2}>
            <DeviceAssignmentErrorIcon />
          </Block>
          <Block>
            <ConfirmAssignmentErrorHelpSubheading>
              <LocalizedText textKey="deviceAssignment.errors.deviceAssignmentFailed.help" />
            </ConfirmAssignmentErrorHelpSubheading>
          </Block>
          <ConfirmAssignmentErrorHr />
          <ConfirmAssignmentErrorHelpBlock>
            <ConfirmAssignmentErrorHelpItem>
              <PhoneIcon fillColor={colors.brandBlue} />
              {phone}
            </ConfirmAssignmentErrorHelpItem>

            <ConfirmAssignmentErrorHelpItem>
              <a href={`mailto:${email}`}>
                <EmailIcon fillColor={colors.brandBlue} />
                {email}
              </a>
            </ConfirmAssignmentErrorHelpItem>
          </ConfirmAssignmentErrorHelpBlock>
        </Block>
      </DeviceAssignmentFeatureContent>
    </Block>
    <FooterWrapperCentered>
      <Button
        onClick={onCancel}
        label={translate(
          'deviceAssignment.errors.deviceAssignmentFailed.goToHome',
        )}
      />
    </FooterWrapperCentered>
  </div>
);

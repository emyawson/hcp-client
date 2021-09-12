import * as React from 'react';
import { Block } from 'src/components/block';
import { Button } from 'src/components/button';
import { LocalizedText } from 'src/components/localized-text';
import { translate } from 'src/i18n';
import { hasValue, RenderIf } from 'src/utils';

import { SuccessBadge } from '../../components/success-badge';
import { constructDeviceName } from '../../device-assignment.utils';
import {
  DeviceAssignmentResultHr,
  DeviceAssignmentResultSubtitle,
  DeviceAssignmentResultTitle,
} from '../device-assignment/device-assignment.style';

import { ConfirmAssignmentSuccessProps } from './confirm-assignment-success.types';

const constructPatientName = (patient): string =>
  patient ? patient.fullName : '';

export const ConfirmAssignmentSuccessComponent: React.StatelessComponent<
  ConfirmAssignmentSuccessProps
> = ({ deviceInfo, selectedPatient, onComplete }) => (
  <Block
    pt={6}
    pb={6}
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    textAlign="center"
  >
    <Block>
      <DeviceAssignmentResultTitle>
        <LocalizedText textKey="deviceAssignment.confirmAssignment.title" />
      </DeviceAssignmentResultTitle>
      <DeviceAssignmentResultHr />
      <RenderIf validate={hasValue(deviceInfo)}>
        <DeviceAssignmentResultSubtitle>
          <strong>{constructDeviceName(deviceInfo)}</strong>{' '}
          {translate('deviceAssignment.confirmAssignment.assignedTo')}{' '}
          <strong>{constructPatientName(selectedPatient)}</strong>
        </DeviceAssignmentResultSubtitle>
      </RenderIf>
    </Block>
    <Block mt={5} mb={5}>
      <SuccessBadge size={140} />
    </Block>
    <Block>
      <Button
        label={translate('deviceAssignment.confirmAssignment.goToDashboard')}
        onClick={onComplete}
      />
    </Block>
  </Block>
);

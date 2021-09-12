import * as React from 'react';

import { DeviceAssignmentErrorProps } from './device-assignment-error.types';

import { XIcon } from 'src/assets/icons';

import { translate } from '../../../../i18n';
import {
  DeviceAssignmentResultTitle,
  DeviceAssignmentResultSubtitle,
  DeviceAssignmentResultHr,
  DeviceAssignmentFeatureContent,
  FooterWrapper,
} from '../device-assignment/device-assignment.style';
import { Block, Badge, Button } from '../../../../components';
import { colors } from '../../../../core';

export const DeviceAssignmentErrorComponent: React.StatelessComponent<
  DeviceAssignmentErrorProps
> = ({ heading, subheading, children, onCancel }) => (
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
      <DeviceAssignmentResultTitle>{heading}</DeviceAssignmentResultTitle>
      <DeviceAssignmentResultHr />
      <DeviceAssignmentResultSubtitle>
        {subheading}
      </DeviceAssignmentResultSubtitle>
    </Block>
    <Block mb={5}>
      <DeviceAssignmentFeatureContent>
        {children}
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

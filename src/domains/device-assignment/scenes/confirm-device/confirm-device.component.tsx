import * as React from 'react';
import { DeviceIcon } from 'src/assets/icons';
import {
  Button,
  GridContainer,
  GridItem,
  LocalizedText,
  ToolTip,
} from 'src/components';
import { translate } from 'src/i18n';
import { RenderIf } from 'src/utils';

import { constructDeviceName } from '../../device-assignment.utils';
import {
  CancelButton,
  CaretLabel,
  CenteredContentPanel,
  Content,
  DeviceHeader,
  DeviceNameHeader,
  DeviceNumberText,
  FooterWrapper,
  HeaderWrapper,
  Hr,
  LargeIconWrapperDiv,
  OtherOptionsDiv,
  PanelContentRightDiv,
  SerialNumberLabel,
} from '../device-assignment/device-assignment.style';

import {
  DeviceInformationDiv,
  WrongDeviceTooltip,
} from './confirm-device.style';
import { ConfirmDeviceProps } from './confirm-device.types';

const renderToolTip = ({ x, y }) => {
  return (
    <ToolTip x={x} y={y}>
      <WrongDeviceTooltip>
        {translate('deviceAssignment.confirmDevice.tooltipText')}
      </WrongDeviceTooltip>
    </ToolTip>
  );
};

export const ConfirmDeviceComponent: React.StatelessComponent<
  ConfirmDeviceProps
> = ({
  deviceInfo,
  onCancel,
  onConfirmDevice,
  toolTip,
  showToolTip,
  hideToolTip,
}) => (
  <GridContainer>
    <GridItem span={12}>
      <HeaderWrapper>
        <h2>
          <LocalizedText textKey="deviceAssignment.confirmDevice.title" />
        </h2>
        <Hr />
      </HeaderWrapper>
    </GridItem>
    <Content>
      <CenteredContentPanel span={12}>
        <LargeIconWrapperDiv>
          <DeviceIcon height={220} />
        </LargeIconWrapperDiv>

        <PanelContentRightDiv>
          <DeviceInformationDiv>
            <DeviceHeader>
              {translate('deviceAssignment.confirmDevice.header')}
            </DeviceHeader>
            <DeviceNameHeader>
              {constructDeviceName(deviceInfo)}
            </DeviceNameHeader>
            <DeviceNumberText>
              <SerialNumberLabel>
                <LocalizedText textKey="deviceAssignment.serialNumber" />
              </SerialNumberLabel>
              {deviceInfo.serialNumber}
            </DeviceNumberText>
          </DeviceInformationDiv>
          <Hr />
          <OtherOptionsDiv>
            <CaretLabel onMouseEnter={showToolTip} onMouseLeave={hideToolTip}>
              {translate('deviceAssignment.confirmDevice.wrongDevice')}
            </CaretLabel>
            <RenderIf validate={toolTip.x && toolTip.y}>
              {renderToolTip(toolTip)}
            </RenderIf>
          </OtherOptionsDiv>
        </PanelContentRightDiv>
      </CenteredContentPanel>
    </Content>
    <GridItem span={12}>
      <FooterWrapper>
        <CancelButton onClick={onCancel}>
          <LocalizedText textKey="deviceAssignment.cancel" />
        </CancelButton>
        <Button
          onClick={onConfirmDevice}
          label={translate('deviceAssignment.confirmDevice.proceedWithDevice')}
          fontWeight="bold"
        />
      </FooterWrapper>
    </GridItem>
  </GridContainer>
);

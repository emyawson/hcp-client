import React from 'react';
import { isEmpty } from 'ramda';

import { RenderIf } from 'src/domains/diagnostics/utils/render-if';

import {
  DeviceDetailsRow,
  DeviceDetailsCell,
  DeviceDetailsTitleText,
  DeviceDetailsContentText,
  IconWrapper,
} from './device-details.style';

export const DeviceDetailsDataRow = props => {
  const { icon: Icon = '' } = props;
  return (
    <DeviceDetailsRow>
      <DeviceDetailsCell>
        <RenderIf validate={!isEmpty(Icon)}>
          <IconWrapper>
            <Icon height={12} />
          </IconWrapper>
        </RenderIf>
        <DeviceDetailsTitleText>{props.titleContent}</DeviceDetailsTitleText>
      </DeviceDetailsCell>
      <DeviceDetailsCell>
        <DeviceDetailsContentText>{props.dataContent}</DeviceDetailsContentText>
      </DeviceDetailsCell>
    </DeviceDetailsRow>
  );
};

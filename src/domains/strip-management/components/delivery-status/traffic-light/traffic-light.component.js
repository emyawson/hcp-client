import React from 'react';

import { TRAFFIC_LIGHT_STATES, colors } from 'src/core';
import {
  CheckmarkIcon,
  BellIcon,
  XIcon,
  WhiteLineIcon,
} from 'src/assets/icons';
import { hasValue } from 'src/utils';

import { Traffic, TrafficIconSpan } from './traffic-light.style';

const iconSizeRatio = 0.4;

export const stateToIcon = (status, size, hideIcon = false) => {
  const iconHeight = size * iconSizeRatio;
  switch (status) {
    case TRAFFIC_LIGHT_STATES.DELIVER:
      return (
        <TrafficIconSpan>
          <CheckmarkIcon height={iconHeight} />
        </TrafficIconSpan>
      );

    case TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT:
      return (
        <TrafficIconSpan>
          <BellIcon height={iconHeight} />
        </TrafficIconSpan>
      );

    case TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER:
      return (
        <TrafficIconSpan>
          <XIcon height={iconHeight} fillColor={colors.white} />
        </TrafficIconSpan>
      );
    default:
      if (hideIcon) return null;
      return (
        <TrafficIconSpan>
          <WhiteLineIcon height={iconHeight} />
        </TrafficIconSpan>
      );
  }
};

export const TrafficLight = ({
  status,
  noIcon = false,
  border = false,
  size = 60,
}) => {
  const trafficLightStatus = hasValue(status)
    ? status
    : TRAFFIC_LIGHT_STATES.DISABLED;
  return (
    <Traffic status={trafficLightStatus} size={size} border={border}>
      {stateToIcon(status, size, noIcon)}
    </Traffic>
  );
};

import React from 'react';

import { TRAFFIC_LIGHT_STATES } from 'src/domains/diagnostics/core/strip-delivery';
import { TrafficLightCircle } from 'src/domains/diagnostics/components';

import { TrafficLightContainer } from './traffic-light.style';

import { TRAFFIC_LIGHT_COLORS } from '../../store/blood-glucose-overview.constants';

const colorToTrafficLightStateMap = {
  [TRAFFIC_LIGHT_COLORS.GRAY]: TRAFFIC_LIGHT_STATES.DISABLED,
  [TRAFFIC_LIGHT_COLORS.GREEN]: TRAFFIC_LIGHT_STATES.DELIVER,
  [TRAFFIC_LIGHT_COLORS.YELLOW]: TRAFFIC_LIGHT_STATES.DELIVER_WITH_ALERT,
  [TRAFFIC_LIGHT_COLORS.RED]: TRAFFIC_LIGHT_STATES.DO_NOT_DELIVER,
};

export const TrafficLight = ({
  children,
  color = TRAFFIC_LIGHT_COLORS.GRAY,
  emptyInnerCircle,
  label,
  size = 30,
}) => (
  <React.Fragment>
    <TrafficLightContainer>
      <TrafficLightCircle
        emptyInnerCircle={emptyInnerCircle}
        status={colorToTrafficLightStateMap[color]}
        size={size}
      />
    </TrafficLightContainer>
    {label}
    {children}
  </React.Fragment>
);

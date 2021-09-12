import React from 'react';

import { TRAFFIC_LIGHT_STATES } from 'src/core';

import { DeliveryStatusWrapperDiv } from './delivery-status-icon.style';

import { TrafficLight } from '../traffic-light';

export const DeliveryStatusIcon = ({
  status = TRAFFIC_LIGHT_STATES.DISABLED,
  noIcon = false,
}) => (
  <DeliveryStatusWrapperDiv status={status}>
    <TrafficLight status={status} noIcon={noIcon} size={36} />
  </DeliveryStatusWrapperDiv>
);

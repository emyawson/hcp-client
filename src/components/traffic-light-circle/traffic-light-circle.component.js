import React from 'react';

import { getTrafficLightColorFromStatus } from 'src/core';

import { Badge } from '../badge';

export const TrafficLightCircle = ({
  disabled,
  emptyInnerCircle,
  icon,
  size,
  status,
}) => (
  <Badge
    bgColor={getTrafficLightColorFromStatus(status)}
    disabled={disabled}
    emptyInnerCircle={emptyInnerCircle}
    icon={icon}
    size={size}
  />
);
TrafficLightCircle.defaultProps = {
  disabled: false,
};

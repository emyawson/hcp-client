import styled from 'styled-components';

import {
  borderRadius,
  spacing,
  transitions,
  transitionSpeed,
  getTrafficLightColorFromStatus,
} from 'src/core';

import { TrafficIconSpan } from '../traffic-light/traffic-light.style';

export const DeliveryStatusWrapperDiv = styled.div`
  border-radius: ${borderRadius.circle};
  border: 1px dashed ${props => getTrafficLightColorFromStatus(props.status)};
  display: inline-block;
  padding: ${spacing.two};
  margin-right: ${spacing.three};
  transition: ${transitions.default};

  ${TrafficIconSpan} {
    animation-delay: ${transitionSpeed.default};
  }
`;

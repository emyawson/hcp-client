import styled from 'styled-components';

import { constructWrapperBackground } from 'src/components/badge/badge.style';
import {
  AnimationHelper,
  transitions,
  transitionSpeed,
  transitionEasing,
  fadeIn,
  getTrafficLightColorFromStatus,
} from 'src/core';
import { convertPxToRem } from 'src/utils';

const borderRatio = 1 / 16.5;

export const TrafficIconSpan = AnimationHelper.extend`
  animation: ${fadeIn} ${transitionSpeed.slow} ${transitionEasing.enter};
  animation-fill-mode: forwards;
  opacity: 0;
  display: flex;
`;

export const Traffic = styled.div`
  align-items: center;
  border-radius: 50%;
  background-clip: padding-box;
  background-color: ${props => getTrafficLightColorFromStatus(props.status)};
  border-color: ${props =>
    constructWrapperBackground(getTrafficLightColorFromStatus(props.status))};
  border-style: solid;
  border-width: ${props =>
    props.border ? convertPxToRem(props.size * borderRatio) : '0'};
  display: flex;
  height: ${props => convertPxToRem(props.size)};
  justify-content: center;
  transition: ${transitions.default};
  width: ${props => convertPxToRem(props.size)};
`;

Traffic.defaultProps = {
  border: false,
  size: 60,
};

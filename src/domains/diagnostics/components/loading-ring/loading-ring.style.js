import styled from 'styled-components';

import {
  AnimationHelper,
  borderRadius,
  colors,
  fadeIn,
  transitionEasing,
  transitionSpeed,
  Grow,
  Rotate180ThenHold,
  Rotate180WithDelay,
} from 'src/domains/diagnostics/styles';
import { convertPxToRem } from 'src/domains/diagnostics/utils';

const borderWidthDefault = 3;
const colorActive = colors.brandBlue;

// Loader should spin for total duration, minus time required to show checkmark
export const calculateSpinDuration = (duration, infinite) =>
  infinite ? duration : duration - parseInt(transitionSpeed.slow, 10);

export const LoadingRingOuterDiv = styled.div`
  position: relative;
  width: ${props => convertPxToRem(props.size)};
  height: ${props => convertPxToRem(props.size)};
  border-radius: ${borderRadius.circle};
  background-color: ${colors.clear};
  overflow: hidden;
`;

const AnimationHelperBlock = AnimationHelper.withComponent('div');

const FillContainerDiv = AnimationHelperBlock.extend`
  height: 100%;
  overflow: hidden;
  position: absolute;
  width: 100%;
`;

export const LoadingRingIconSpan = AnimationHelper.extend`
  color: ${colors.white};
`;

export const LoadingRingContentDiv = styled.div`
  align-items: center;
  animation: ${fadeIn} ${transitionSpeed.slow} ${transitionEasing.enter}
    ${props => props.delay}ms;
  animation-fill-mode: forwards;
  background-color: ${colorActive};
  border-radius: ${borderRadius.circle};
  display: flex;
  height: 100%;
  justify-content: center;
  opacity: 0;
  width: 100%;

  ${LoadingRingIconSpan} {
    animation: ${Grow} ${transitionSpeed.slow} ${transitionEasing.enter}
      ${props => props.delay}ms;
    animation-fill-mode: forwards;
  }
`;

export const LoadingRingSplitDiv = styled.div`
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 50%;
`;

export const LoadingRingProgressDiv = FillContainerDiv.extend`
  animation-delay: ${props => props.delay}ms;
  animation-duration: ${props => props.duration}ms;
  animation-fill-mode: forwards;
  animation-iteration-count: ${props => (props.infinite ? 'infinite' : '1')};
  border: ${convertPxToRem(borderWidthDefault)} solid ${colorActive};
  bottom: 0;
  top: 0;
`;

export const LoadingRingLeftDiv = LoadingRingSplitDiv.extend`
  left: 0;
  ${LoadingRingProgressDiv} {
    animation-name: ${Rotate180WithDelay};
    animation-timing-function: ${transitionEasing.enter};
    border-bottom-right-radius: ${props => convertPxToRem(props.size)};
    border-left: 0;
    border-top-right-radius: ${props => convertPxToRem(props.size)};
    left: 100%;
    transform-origin: center left;
  }
`;

export const LoadingRingRightDiv = LoadingRingSplitDiv.extend`
  right: 0;
  ${LoadingRingProgressDiv} {
    animation-name: ${Rotate180ThenHold};
    animation-timing-function: ${transitionEasing.exit};
    border-bottom-left-radius: ${props => convertPxToRem(props.size)};
    border-top-left-radius: ${props => convertPxToRem(props.size)};
    border-right: 0;
    left: -100%;
    transform-origin: center right;
  }
`;

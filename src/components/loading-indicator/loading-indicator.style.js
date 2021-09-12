import styled from 'styled-components';

import {
  AnimationHelper,
  bounceUp,
  pulseWithDelay,
  spacing,
  transitionSpeed,
} from 'src/core';

const fadeAnimationOffset = parseInt(transitionSpeed.default, 10);
const fadeAnimationLength = parseInt(fadeAnimationOffset, 10) * 6;
const bounceAnimationLength = parseInt(transitionSpeed.default, 10) * 2;
const bounceAnimationOffset = bounceAnimationLength / 3;
const loadingMarkerSizeDefault = spacing.three;

const animationMap = {
  bounce: {
    direction: 'alternate',
    duration: bounceAnimationLength,
    easing: 'cubic-bezier(0, 0, 0.15, 1)',
    keyframes: bounceUp,
    offset: bounceAnimationOffset,
  },
  fade: {
    direction: 'both',
    duration: fadeAnimationLength,
    easing: 'ease-in-out',
    keyframes: pulseWithDelay,
    offset: fadeAnimationOffset,
  },
};

const createAnimationString = (animation: string): string => {
  if (animationMap[animation]) {
    const { keyframes, duration, easing, direction } = animationMap[animation];
    return `${keyframes} ${duration}ms ${easing} ${direction} infinite`;
  }
  return 'none';
};

export const LoadingIndicatorSpan = styled.span`
  display: inline-block;
  font-size: ${props => (props.size ? props.size : loadingMarkerSizeDefault)};
  line-height: 1;
  vertical-align: baseline;
  transform: translate3d(0, 0, 0);
  will-change: opacity, transform;
`;

export const LoadingIndicatorMarkerSpan = AnimationHelper.extend`
  margin-right: 0.5em;
  animation: ${props => createAnimationString(props.animation)};

  &:nth-child(2) {
    animation-delay: ${props =>
      props.animation ? `${animationMap[props.animation].offset}ms` : '0'};
  }

  &:nth-child(3) {
    animation-delay: ${props =>
      props.animation ? `${animationMap[props.animation].offset * 2}ms` : '0'};
  }
`;

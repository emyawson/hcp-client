import styled, { keyframes } from 'styled-components';

export const AnimationHelper = styled.div`
  will-change: opacity, transform;
`;

export const AnimationHelperInline = AnimationHelper.extend`
  display: inline-block;
`;

// ---- Generic animations  ----
// Fade in an element on first display - useful for lazy loading content
export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

// Fade out an element without modifiying display or visiblity styles
export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const animations = {
  fadeIn,
  fadeOut,
};

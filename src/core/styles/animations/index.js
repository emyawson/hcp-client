import styled, { keyframes } from 'styled-components';

import {
  opacityScale,
  transformScale,
  toPercentage,
  toPercentageStr,
} from './animations.util';

// Helper class for Styled Components using keyframe animation
// -- 'will-change' assists with hardware acceleration on animated properties
// -- 'display: inline-block' enables transforms on inline items
// -----------------------------------------------------------------
// Usage for inline elements:
// -- const AnimatedThing = AnimationHelper.extend``
// -----------------------------------------------------------------
// Usage for block level or custom elements:
// -- const AnimatedBlock = AnimationHelper.withComponent('div')
// -- const AnimatedThing = AnimatedBlock.extend``
// -----------------------------------------------------------------
export const AnimationHelper = styled.span`
  display: inline-block;
  will-change: opacity, transform;
`;

// ---- CSS Keyframe Animations  ----
// Used in situations where CSS transitions don't apply, such as:
// Looping, complex multi-point animations, or for easy onload transitions
// Can be used in combination with easing & duration values in core transitions
// -----------------------------------------------------------------
// Styled components usage:
// import { yourAnimationName } from "src/core";
// ...
// animation: ${yourAnimationName} ${duration}ms ${easing};
// -----------------------------------------------------------------

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

// Fade an element from near visibility to full visibility and back again
// Add animation-delay to multiple children for a pulsing wave effect
// Used in fading LoadingIndicator
export const pulseWithDelay = keyframes`
  0% {
    opacity: ${opacityScale.disabled};
  }
  25% {
    opacity: ${opacityScale.default};
  }
  50% {
    opacity: ${opacityScale.disabled};
  }
  100% {
    opacity: ${opacityScale.disabled};
  }
`;

// Bounce an element into the air with a slight grow
// Use with animation-direction: alternate to bounce up and down
// Used in bouncing LoadingIndicator
export const bounceUp = keyframes`
from {
  transform: translateY(0) scaleY(${toPercentage(transformScale.five)});
}
to {
  transform: translateY(-${toPercentageStr(transformScale.five)});
}
`;

export const Rotate180ThenHold = keyframes`
0% {
  transform: rotate(0deg);
}
50% {
  transform: rotate(180deg);
}
100% {
  transform: rotate(180deg);
}
`;

export const Rotate180WithDelay = keyframes`
0% {
  transform: rotate(0deg);
}
50% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(180deg);
}
`;

export const Grow = keyframes`
from {
  transform: scale(${transformScale.three / 100});
}
to {
  transform: scale(${transformScale.full / 100});
}
`;

// ---- Vertical animations, for progress or loading  ----
const nudge = toPercentageStr(transformScale.one);
const fly = toPercentageStr(transformScale.full);

// Fade in an element with a slight raise into position
export const slideUpFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(${nudge});
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Fade out an element with a slight drop from current position
export const slideDownFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0%);
  }

  100% {
    opacity: 0;
    transform: translateY(${nudge});
  }
`;

// ---- Horizontal animations, for elements being introduced or removed  ----
// Fly large elements on the stage and fade in
export const slideOnscreenFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(${fly});
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Fly large elements off the stage and fade out
export const slideOffscreenFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0%);
  }

  100% {
    opacity: 0;
    transform: translateX(${fly});
  }
`;

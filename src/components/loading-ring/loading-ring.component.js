import React from 'react';

import { CheckmarkIcon } from 'src/assets/icons';
import { RenderIf } from 'src/utils';

import {
  LoadingRingOuterDiv,
  LoadingRingContentDiv,
  LoadingRingLeftDiv,
  LoadingRingRightDiv,
  LoadingRingProgressDiv,
  LoadingRingIconSpan,
  calculateSpinDuration,
} from './loading-ring.style';

type Props = {
  delay: number,
  duration: number, // in milliseconds
  infinite: boolean,
  size: number, // in px
};

export const LoadingRing = ({
  delay = 0,
  duration = 1000,
  infinite = true,
  size = 80,
  isComplete = false,
}: Props) => {
  const spinDuration = calculateSpinDuration(duration, infinite);
  return (
    <LoadingRingOuterDiv size={size}>
      <LoadingRingLeftDiv duration={spinDuration} size={size}>
        <LoadingRingProgressDiv
          delay={delay}
          duration={spinDuration}
          infinite={infinite}
          size={size}
        />
      </LoadingRingLeftDiv>
      <LoadingRingRightDiv duration={spinDuration} size={size}>
        <LoadingRingProgressDiv
          delay={delay}
          duration={spinDuration}
          infinite={infinite}
          size={size}
        />
      </LoadingRingRightDiv>
      <RenderIf validate={isComplete}>
        <LoadingRingContentDiv delay={delay}>
          <LoadingRingIconSpan>
            <CheckmarkIcon height={size / 3} />
          </LoadingRingIconSpan>
        </LoadingRingContentDiv>
      </RenderIf>
    </LoadingRingOuterDiv>
  );
};

import React from 'react';

import { RenderIf } from 'src/utils';

import {
  LoadingMessageContainerDiv,
  LoadingMessageHeadline,
} from './loading-message.style';

import { LoadingRing } from '../loading-ring';

export const LoadingMessage: FixMe = ({
  delay,
  duration,
  flexibleHeight = false,
  infinite = false,
  minHeight = 0,
  size,
  text = '',
  isComplete = false,
}) => (
  <LoadingMessageContainerDiv
    flexibleHeight={flexibleHeight}
    minHeight={minHeight}
  >
    <RenderIf validate={text}>
      <LoadingMessageHeadline>{text}</LoadingMessageHeadline>
    </RenderIf>
    <LoadingRing
      delay={delay}
      duration={duration}
      infinite={infinite}
      size={size}
      isComplete={isComplete}
    />
  </LoadingMessageContainerDiv>
);

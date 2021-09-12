import React from 'react';

import {
  ProgressBarBackground,
  ProgressBarContainer,
  ProgressBarFill,
} from './progress-bar.style';

export const ProgressBar = ({ fill, color }) => (
  <ProgressBarContainer>
    <ProgressBarBackground>
      <ProgressBarFill fill={fill || 0} color={color} />
    </ProgressBarBackground>
  </ProgressBarContainer>
);

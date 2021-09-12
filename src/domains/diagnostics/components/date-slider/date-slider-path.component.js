import React from 'react';

import { Path } from './date-slider.style';

export const DateSliderPath = ({ disabled, children, registerRef }) => (
  <Path disabled={disabled} innerRef={registerRef}>
    {children}
  </Path>
);

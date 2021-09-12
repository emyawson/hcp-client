import React from 'react';

import { Handle } from './date-slider.style';

export const DateSliderHandle = ({
  left,
  onMouseDown,
  registerRef,
  dragging,
  children,
}) => (
  <Handle
    dragging={dragging}
    left={left}
    onMouseDown={onMouseDown}
    innerRef={registerRef}
  >
    {children}
  </Handle>
);

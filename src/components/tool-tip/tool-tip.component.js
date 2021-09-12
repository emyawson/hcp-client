import React from 'react';

import { ToolTipContainerDiv } from './tool-tip.style';

import { Portal } from '../portal';

export const ToolTip = ({ x, y, children }) => (
  <Portal rootId="tool-tip-root">
    <ToolTipContainerDiv x={x} y={y}>
      {children}
    </ToolTipContainerDiv>
  </Portal>
);

import React from 'react';

import { Portal } from 'src/domains/diagnostics/components/portal';

import { ToolTipContainerDiv } from './tool-tip.style';

export const ToolTip = ({ x, y, children }) => (
  <Portal rootId="tool-tip-root">
    <ToolTipContainerDiv x={x} y={y}>
      {children}
    </ToolTipContainerDiv>
  </Portal>
);

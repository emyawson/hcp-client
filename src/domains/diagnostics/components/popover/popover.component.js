import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';

import {
  PopoverContainerDiv,
  PopoverRectangleContainer,
} from './popover.style';

export const Popover = ({
  backgroundColor = colors.white,
  children,
  pushLeft,
  show,
  width,
}) => (
  <PopoverContainerDiv show={show}>
    <PopoverRectangleContainer
      backgroundColor={backgroundColor}
      pushLeft={pushLeft}
      width={width}
    >
      {children}
    </PopoverRectangleContainer>
  </PopoverContainerDiv>
);

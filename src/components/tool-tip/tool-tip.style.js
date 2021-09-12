import styled from 'styled-components';

import { borderRadius, boxShadow, colors } from 'src/core';

export const ToolTipContainerDiv = styled.div`
  background-color: ${colors.white};
  border-radius: ${borderRadius.three};
  box-shadow: ${boxShadow({
    color: colors.black,
    size: 'small',
  })};
  color: ${colors.charcoal};
  overflow: hidden;
  position: absolute;
  top: ${props => `${props.y}px`};
  left: ${props => `${props.x}px`};
  z-index: 1;
`;

ToolTipContainerDiv.displayName = 'ToolTipContainerDiv';

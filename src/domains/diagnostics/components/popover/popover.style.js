import styled from 'styled-components';

import {
  boxShadow,
  colors,
  zIndexes,
  borderRadius,
} from 'src/domains/diagnostics/styles';

export const PopoverContainerDiv = styled.div`
  display: ${props => (props.show ? 'inherit' : 'none')};
  position: relative;
  top: 0;
  z-index: ${zIndexes.popover};
`;

export const PopoverRectangleContainer = styled.div`
  background-color: ${props => props.backgroundColor};
  opacity: 1;
  border-top: 3px solid ${colors.brandBlue};
  border-radius: ${borderRadius.three};
  position: absolute;
  width: ${props => `${props.width}rem`};
  left: ${props => `-${props.pushLeft}rem`};
  box-shadow: ${boxShadow({
    color: colors.charcoal,
    depth: 'popover',
  })};
`;

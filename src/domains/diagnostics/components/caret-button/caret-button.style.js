import styled from 'styled-components';
import { equals } from 'ramda';

import {
  ButtonReset,
  colors,
  transitions,
} from 'src/domains/diagnostics/styles';

import { CARET_MODE } from './caret-button.constant';

const FILL_FROM_MODE = {
  [CARET_MODE.DEFAULT]: colors.grayMedium,
  [CARET_MODE.DISABLED]: colors.grayLight,
  [CARET_MODE.ACTIVE]: colors.brandBlue,
};

const HOVER_FILL_FROM_MODE = {
  [CARET_MODE.DEFAULT]: colors.brandBlue,
  [CARET_MODE.DISABLED]: colors.grayLight,
  [CARET_MODE.ACTIVE]: colors.brandBlue,
};

export const CaretIconButton = ButtonReset.extend`
  align-items: center;
  display: inline-flex;
  justify-content: center;

  path {
    transition: ${transitions.default};
    fill: ${props => FILL_FROM_MODE[props.mode]};
  }

  &:hover,
  &:focus {
    path {
      fill: ${props => HOVER_FILL_FROM_MODE[props.mode]};
    }
  }
  pointer-events: ${props =>
    equals(props.mode, CARET_MODE.DISABLED) ? 'none' : 'auto'};
`;

// Adust icon positioning within circular button
// Vertically flip icon if direction set to "UP"
export const CaretIconUpSpan = styled.span`
  transform: scale(-1) translateY(-1px);
`;

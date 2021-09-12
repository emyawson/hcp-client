import styled from 'styled-components';

import { borderRadius, transitions } from 'src/core';
import { BadgeIconSpan } from 'src/components/badge/badge.style';

const paddingRatio = 1 / 6;

export const StatusLabel = styled.label`
  border-radius: ${borderRadius.circle};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
  transition: ${transitions.default};

  &:hover,
  &:focus {
    ${BadgeIconSpan} {
      transform: scale(${1 + paddingRatio * 2}) translate3d(0, 0, 0);
    }
  }
`;

export const RadioButtonReset = styled.input`
  appearance: none;
  visibility: hidden;
`;

export const ForceIconSpan = styled.span`
  position: relative;
`;

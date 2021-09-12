import styled from 'styled-components';

import { colors, borderRadius } from 'src/core';

export const ProgressBarContainer = styled.div`
  width: 100%;
`;

export const ProgressBarBackground = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${colors.grayLight};
  border-radius: ${borderRadius.three};
  overflow: hidden;
`;

export const ProgressBarFill = styled.div`
  width: ${props =>
    `${props.fill > 100 ? 100 : props.fill < 0 ? 0 : props.fill}%`};
  transition: all 1000ms ease-in-out;
  height: 100%;
  background-color: ${props => `${props.color}`};
`;

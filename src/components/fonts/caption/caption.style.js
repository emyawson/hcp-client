import styled from 'styled-components';

import { colors } from 'src/core/styles/colors';

import { weight } from '../weights';

// 12px
export const Caption = styled.p`
  color: ${colors.grayDark};
  font-size: 0.75rem;
  font-weight: ${weight.bold};
  letter-spacing: 0.04em;
  margin-top: 0;
  margin-bottom: 0;
  text-transform: uppercase;
`;

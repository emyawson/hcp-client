import styled from 'styled-components';

import { colors } from 'src/core/styles/colors';

import { weight } from '../weights';

// 14px
export const P = styled.p`
  font-size: 0.875rem;
  font-weight: ${weight};
`;

export const TitleSm = P.extend`
  color: ${colors.brandBlue};
  text-transform: uppercase;
`;

import styled from 'styled-components';
import { fontWeight } from 'styled-system';

import { weight } from '../weights';

// 24px
export const Headline = styled.h5`
  font-size: 1.5rem;
  font-weight: ${weight};
  margin: 0;
  ${fontWeight}; // allow overwrites of font-weight
`;

Headline.displayName = 'Headline';

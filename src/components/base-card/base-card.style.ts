import { borders, space } from 'styled-system';

import { Div } from '../div/div.component';

export const BaseCardDiv = Div.extend`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius[2]};
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: ${({ theme }) => theme.spacing.four};
  /* provide default padding while allowing override */
  ${space};
  ${borders};
`;

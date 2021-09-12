import { IThemeInterface } from '@roche/patterns-indicators/theme';
import styled, { StyledComponentClass } from 'styled-components';

// 14px
export const P: StyledComponentClass<{}, IThemeInterface> = styled.p`
  font-size: 0.875rem;
  /* TODO: this style doesn't really make sense. Remove? */
  font-weight: ${({ theme }) => theme.fontWeights};
`;

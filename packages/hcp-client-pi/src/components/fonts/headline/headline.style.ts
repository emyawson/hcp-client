import { IThemeInterface } from '@roche/patterns-indicators/theme';
import styled, { StyledComponentClass } from 'styled-components';

// 24px
export const Headline: StyledComponentClass<{}, IThemeInterface> = styled.h5`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights};
  margin: 0;
`;

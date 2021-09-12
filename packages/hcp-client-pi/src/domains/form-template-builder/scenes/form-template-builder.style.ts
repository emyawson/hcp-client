import styled, { IThemeInterface } from '@roche/patterns-indicators/theme';
import { StyledComponentClass } from 'styled-components';

import { convertPxToRem } from '../../../utils/styles/rem-calc';

export const CategoryHeader: StyledComponentClass<{}, IThemeInterface> = styled.div`
  margin-bottom: 4rem;
`;

export const PatternContainer: StyledComponentClass<{}, IThemeInterface> = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.three};
`;

export const PatternHeader: StyledComponentClass<{}, IThemeInterface> = styled.div`
  background-color: ${({ theme }) => theme.colors.blueMarineAlpha};
  color: ${({ theme }) => theme.colors.blueMarine5};
  font-size: ${({ theme }) => theme.BASE_FONT_SIZE};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: ${({ theme }) => theme.spacing.three};
  text-transform: ${({ theme }) => theme.textStyles.caps.textTransform};
  width: 100%;
`;

export const ToggleSwitchContainer: StyledComponentClass<{}, IThemeInterface> = styled.div`
  float: right;
  width: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('60px')};
  bottom: 0.2rem;
  position: relative;
`;

import styled, { IThemeInterface } from '@roche/patterns-indicators/theme';
import { StyledComponentClass } from 'styled-components';

import { convertPxToRem } from '../../../../utils/styles/rem-calc';

export const ErrorMessagesContent: StyledComponentClass<
  {},
  IThemeInterface
> = styled.ol`
  color: ${({ theme }) => theme.colors.red};
  margin-top: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('-50px')};
  line-height: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('50px')};
  margin-left: ${({ theme }) => convertPxToRem(theme.BASE_FONT_SIZE)('-40px')};
  list-style-type: none;
`;

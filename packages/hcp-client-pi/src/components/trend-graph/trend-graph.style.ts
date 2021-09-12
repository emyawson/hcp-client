import { IThemeInterface } from '@roche/patterns-indicators/theme';
import styled, { StyledComponentClass } from 'styled-components';

export const TrendGraphWrapper: StyledComponentClass<
  {},
  IThemeInterface
> = styled<{}, 'div'>('div')`
  height: auto;
`;

TrendGraphWrapper.displayName = 'TrendGraphWrapper';

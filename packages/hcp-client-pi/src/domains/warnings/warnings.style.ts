import { IThemeInterface } from '@roche/patterns-indicators/theme';
import styled, { StyledComponentClass } from 'styled-components';

export const WarningsWrapper: StyledComponentClass<
  {},
  IThemeInterface
> = styled<{}, 'div'>('div')`
  width: 100%;
`;

WarningsWrapper.displayName = 'WarningsWrapper';

export const WarningsHeader: StyledComponentClass<{}, IThemeInterface> = styled<
  {},
  'div'
>('div')`
  width: 100%;
  display: flex;
  margin-bottom: ${props => props.theme.spacing.two};
`;

WarningsHeader.displayName = 'WarningsHeader';

import { createStyledComponent, IThemeInterface } from '@roche/patterns-indicators/theme';
import { StyledComponentClass } from 'styled-components';

export const CompareContainer: StyledComponentClass<
  {},
  IThemeInterface
> = createStyledComponent<'div', {}>('div')`
  width: 100%;
`;

CompareContainer.displayName = 'CompareContainer';

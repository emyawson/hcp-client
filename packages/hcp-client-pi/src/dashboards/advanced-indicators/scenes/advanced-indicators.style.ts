import { IThemeInterface } from '@roche/patterns-indicators/theme';
import styled, { StyledComponentClass } from 'styled-components';
import { space } from 'styled-system';

export const createStyledComponent = <
  Tag extends keyof JSX.IntrinsicElements,
  Props
>(
  tag: Tag,
  props: Props,
) => styled<Props, Tag>(tag);

export const FlexibleHeightCard: StyledComponentClass<
  {},
  IThemeInterface
> = createStyledComponent('div', {})`
  position: relative;
  z-index: ${props => props.theme.zIndexes.base};
  background: ${props => props.theme.colors.white};
  margin-bottom: ${props => props.theme.spacing.two};
  border: 1px solid ${props => props.theme.colors.silverMedium};
  border-radius: ${props => props.theme.borderRadius.six};
  box-shadow: ${props => props.theme.boxShadows.two};
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: "Nunito", -apple-system,BlinkMacSystemFont, "Segoe UI", sans-serif;
`;

FlexibleHeightCard.displayName = 'FlexibleHeightCard';

export const NavContainerMain: StyledComponentClass<
  {},
  IThemeInterface
> = createStyledComponent('div', {})`
  display: flex;
  margin-bottom: 2rem;
`;

NavContainerMain.displayName = 'NavContainerMain';

export const NavContainer: StyledComponentClass<
  {},
  IThemeInterface
> = createStyledComponent('div', {})`
  ${space};
  width: 100%;
`;

NavContainer.displayName = 'NavContainer';

export const SettingsMenuLinkContainer: StyledComponentClass<
  {},
  IThemeInterface
> = styled.div`
  margin-left: auto;
  margin-right: ${({ theme }) => theme.spacing.two};
  margin-bottom: ${({ theme }) => theme.spacing.two};
`;

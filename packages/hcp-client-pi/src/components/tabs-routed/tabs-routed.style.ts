import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import { flex, space } from 'styled-system';

import { IThemeInterface } from '@roche/patterns-indicators/theme';
import { combineRems, convertPxToRem } from '@roche/patterns-indicators/utils';
import { StyledSystemProps } from '@roche/patterns-indicators/utils/styles/styled-system.types';

const LINK_ACTIVE_CLASS = 'active';
const colorActive = colors => colors.blue;

export const createStyledComponent = <
  Tag extends keyof JSX.IntrinsicElements,
  Props
>(
  tag: Tag,
) => styled<Props, Tag>(tag);

export const TabsContainer: StyledComponentClass<
  StyledSystemProps,
  IThemeInterface
> = createStyledComponent<'div', StyledSystemProps>('div')`
  ${space};
  ${flex};
  width: 100%;
`;

export const TabContent: StyledComponentClass<
  {},
  IThemeInterface
> = createStyledComponent<'div', {}>('div')`
  margin: 0 auto;
  width: 100%;
  display: flex;
  padding: ${props => props.theme.spacing.four};
  overflow: auto;
`;
TabContent.displayName = 'TabContent';

export interface TabBarWrapperProps extends StyledSystemProps {
  withPadding?: boolean;
  theme?: IThemeInterface;
}

export const TabBarWrapper: StyledComponentClass<
  TabBarWrapperProps,
  IThemeInterface
> = createStyledComponent<'nav', TabBarWrapperProps>('nav')`
  border-bottom: ${props =>
    `${convertPxToRem(props.theme.BASE_FONT_SIZE)(3)} solid ${
      props.theme.colors.silver
    }`};
  box-sizing: border-box;
  padding: ${props =>
    props.withPadding ? `0 ${props.theme.spacing.four}` : '0'};
  width: 100%;
  ${space};
`;
TabBarWrapper.displayName = 'TabBarWrapper';

export interface TabsListProps {
  children: any;
}

export const TabsList: StyledComponentClass<
  TabsListProps,
  IThemeInterface
> = createStyledComponent<'ul', TabsListProps>('ul')`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  list-style: none;
  margin: 0;
  padding: 0;
`;
TabsList.displayName = 'TabsList';

const tabDefaultBottomPadding = spacing =>
  combineRems(spacing.three, spacing.one);
const tabActiveHighlightHeight = BASE_FONT_SIZE =>
  convertPxToRem(BASE_FONT_SIZE)(3);

export interface TabsListItemProps {
  children: any;
  className: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const TabsListItem: StyledComponentClass<
  TabsListItemProps,
  IThemeInterface
> = createStyledComponent<'li', TabsListItemProps>('li')`
  font-family: "Nunito", -apple-system,BlinkMacSystemFont, "Segoe UI", sans-serif;  
  font-size: 1rem;
  color: ${props => props.theme.colors.charcoal};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  text-transform: uppercase;
  margin-right: ${props => props.theme.spacing.four};
  padding: ${props => `0 0 ${combineRems(
    tabDefaultBottomPadding(props.theme.spacing),
    tabActiveHighlightHeight(props.theme.BASE_FONT_SIZE),
  )}
    0`};
  position: relative;
  transition: ${props => props.theme.transitions.default};

  &::after {
    background-color: transparent;
    bottom: -${props => tabActiveHighlightHeight(props.theme.BASE_FONT_SIZE)};
    border-radius: 0.25rem;
    content: "";
    display: block;
    height: ${props => tabActiveHighlightHeight(props.theme.BASE_FONT_SIZE)};
    left: 0;
    right: 0;
    position: absolute;
    transition: ${props => props.theme.transitions.default};
  }

  &:hover {
    color: ${props => colorActive(props.theme.colors)};
  }

  &.${LINK_ACTIVE_CLASS} {
    color: ${props => colorActive(props.theme.colors)};
        &::after {
          background-color: ${props => colorActive(props.theme.colors)};
        }
        &:focus {
          &::after {
            box-shadow: ${props =>
              props.theme.boxShadow({
                color: colorActive(props.theme.colors),
                depth: 'base',
              })};
          }
        }
  }

  &:focus {
    color: ${props => colorActive(props.theme.colors)};
    outline: none;
  }
`;
TabsListItem.displayName = 'TabsListItem';

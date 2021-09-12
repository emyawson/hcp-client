import { IThemeInterface } from '@roche/patterns-indicators/theme';
import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';

/* TODO: move border styles outside of this base component and apply to a wrapper component */
export const Container: StyledComponentClass<null, IThemeInterface> = styled<
  null,
  'div'
>('div')`
  display: flex;
  padding: ${({ theme }) => theme.spacing.four};
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border-left: 0.0625rem solid ${props => props.theme.colors.silverDark};
  border-bottom: 0.0625rem solid ${props => props.theme.colors.silverDark};
  border-right: 0.0625rem solid ${props => props.theme.colors.silverDark};
`;

export const Nav: StyledComponentClass<
  { onChange?: (event: React.ChangeEvent<any>) => void },
  IThemeInterface
> = styled.nav`
  padding-right: 3rem;
  width: 24rem;
  min-width: 24rem;
`;

export const NavTabsList: StyledComponentClass<{}, IThemeInterface> = styled.ul`
  list-style-type: none;
  height: 100%;
  padding: 0;
  margin: 0;
`;

interface NavTabsListItemProps {
  selected: boolean;
  selectedStyle: string;
  onClick?: () => void;
}

export const NavTabsListItem: StyledComponentClass<
  NavTabsListItemProps,
  IThemeInterface
> = styled<NavTabsListItemProps, 'li'>('li')`
  cursor: pointer;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.grayLight};
  display: flex;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.silverLight : theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  line-height: 2;
  font-size: ${({ theme }) => theme.fontSizes.label};
`;
NavTabsListItem.displayName = 'NavTabsListItem';

export const NavTabsListTitle: StyledComponentClass<
  {},
  IThemeInterface
> = styled.div`
  margin-bottom: 4rem;
`;

interface SelectedLineProps {
  show: boolean;
}
export const SelectedLine: StyledComponentClass<
  SelectedLineProps,
  IThemeInterface
> = styled<SelectedLineProps, 'span'>('span')`
  display: inline-block;
  min-height: 4rem;
  position: relative;
  border-left: ${({ show, theme }) =>
    show ? `3px solid ${theme.colors.blue}` : `3px solid transparent`};
  border-radius: ${({ theme }) => theme.borderRadius[2]};
`;

export const NavTabsListItemText: StyledComponentClass<
  {},
  IThemeInterface
> = styled.div`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.two};
  margin: auto 0;
  width: 100%;
`;

export const ContentContainer: StyledComponentClass<
  {},
  IThemeInterface
> = styled.section`
  margin-left: ${({ theme }) => theme.spacing.two};
  padding: 0 ${({ theme }) => theme.spacing.one};
  width: 100%;
`;

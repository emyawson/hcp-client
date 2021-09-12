import styled from 'styled-components';
import { space, width } from 'styled-system';
import { NavLink } from 'react-router-dom';

import { convertPxToRem, combineRems } from 'src/domains/diagnostics/utils';
import { TitleMed } from 'src/domains/diagnostics/components';
import {
  boxShadow,
  colors,
  fontSize,
  spacing,
  transitions,
} from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';

const LINK_ACTIVE_CLASS = 'active';
const colorActive = colors.blue;

export const TabsContainer = styled.div`
  ${space};
  display: ${props => props.flex && 'flex'};
  width: 100%;
`;

// Wrapper for active tab content
export const TabContent = styled.div`
  margin: 0 auto;
`;
TabContent.displayName = 'TabContent';

// Create spacing between nav and active tab content
export const TabBarWrapper = styled.nav`
  border-bottom: ${convertPxToRem(3)} solid ${colors.silver};
  padding: ${props => (props.withPadding ? `0 ${spacing.four}` : '0')};
  width: 100%;
  ${space};
`;
TabBarWrapper.displayName = 'TabBarWrapper';

// Create spacing between nav and active tab content
export const TabBarWrapperSmall = styled.nav`
  margin: ${spacing.three} auto 0 0;
  padding: ${props => (props.withPadding ? `0 ${spacing.four}` : '0')};
  width: 100%;
  ${space};
  ${width};
`;
TabBarWrapperSmall.displayName = 'TabBarWrapperSmall';

// Reset list styling, vertically center tab children
export const TabsList = styled.ul`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  list-style: none;
  margin: 0;
  padding: 0;
`;
TabsList.displayName = 'TabsList';

// Extend shared Subheadline styling to tab navigation
// Create spacing between tab items
export const TabsListItem = TitleMed.withComponent('li').extend`
  margin-right: ${spacing.four};
`;
TabsListItem.displayName = 'TabsListItem';

export const TabsListItemSmall = TitleMed.withComponent('li').extend`
  padding: 0 0.87rem 0 0.87rem;
  border-right: 1px solid ${colors.grayLighter};
`;
TabsListItemSmall.displayName = 'TabsListItemSmall';

// Individual Tab link styling
const tabDefaultBottomPadding = combineRems(spacing.three, spacing.one);
const tabActiveHighlightHeight = convertPxToRem(3);

// Sets highlighted styling for tab link that matches current route
export const TabLink = styled('p')`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  font-size: ${fontSize.subheading};
  font-weight: ${weight.semiBold};
  margin: 0;
  padding: 0 0 ${combineRems(tabDefaultBottomPadding, tabActiveHighlightHeight)}
    0;
  position: relative;
  transition: ${transitions.default};
  text-decoration: none;
  text-transform: uppercase;

  &::after {
    background-color: transparent;
    bottom: -${tabActiveHighlightHeight};
    border-radius: 0.25rem;
    content: '';
    display: block;
    height: ${tabActiveHighlightHeight};
    left: 0;
    right: 0;
    position: absolute;
    transition: ${transitions.default};
  }

  &:hover {
    color: ${colorActive};
  }

  &.${LINK_ACTIVE_CLASS} {
    color: ${colorActive};
    &::after {
      background-color: ${colorActive};
    }
    &:focus {
      &::after {
        box-shadow: ${boxShadow({
          color: colorActive,
          depth: 'base',
        })};
      }
    }
  }

  &:focus {
    color: ${colorActive};
    outline: none;
  }
`;
TabLink.displayName = 'TabLink';

export const RouterTabLink = TabLink.withComponent(NavLink);

// Sets highlighted styling for tab link that matches current route
export const TabLinkSmall = styled('p')`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  font-size: ${fontSize.p};
  font-weight: ${weight.semiBold};
  margin: 0;
  position: relative;
  transition: ${transitions.default};
  text-decoration: none;

  &:hover {
    color: ${colorActive};
  }

  &.${LINK_ACTIVE_CLASS} {
    color: ${colorActive};
  }

  &:focus {
    color: ${colorActive};
    outline: none;
  }
`;
TabLinkSmall.displayName = 'TabLinkSmall';

export const RouterTabLinkSmall = TabLinkSmall.withComponent(NavLink);
RouterTabLinkSmall.displayName = 'RouterTabLinkSmall';

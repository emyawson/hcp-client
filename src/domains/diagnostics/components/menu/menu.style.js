import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

import {
  borderRadius,
  boxShadows,
  colors,
  fontSize,
  spacing,
  transitions,
  zIndexes,
} from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';

const menuTransition = transitions.default;
const colorActive = colors.brandBlue;

export const RouteNav = styled.nav`
  align-items: flex-start;
  background-color: ${colors.white};
  border-radius: 0 ${borderRadius.six} ${borderRadius.six} 0;
  bottom: 0;
  box-shadow: ${boxShadows.routeNav};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  left: 0;
  width: 6rem;
  padding: 0;
  position: fixed;
  top: 0;
  z-index: ${zIndexes.routeNav};
`;

export const Ul = styled.ul`
  padding: ${spacing.three} 0 0;
  margin: 0;
  width: 100%;
`;

export const CommonUl = Ul.extend`
  width: 100%;
`;

const SelectedLineBase = styled.div`
  content: '';
  background: ${colorActive};
  width: 0.375rem;
  border-radius: 0.375rem;
  position: absolute;
  left: 0;
  top: 0;
  height: calc(100% - 0.9rem);
`;

export const SelectedLine = () => <SelectedLineBase className="selectedline" />;

const linkActiveStyles = css`
  .selectedline {
    display: none;
  }
  path,
  g {
    transition: ${menuTransition};
  }
  &:hover {
    color: ${colorActive};
    path {
      fill: ${colorActive};
    }
    g {
      stroke: ${colorActive};
    }
  }
  &.selected {
    color: ${colorActive};
    .selectedline {
      display: block;
    }
    path {
      fill: ${colorActive};
    }
    g {
      stroke: ${colorActive};
    }
  }
`;

const MenuNavItem = styled.span`
  position: relative;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${spacing.two} ${spacing.one} ${spacing.three};
  font-size: ${fontSize.p};
  font-weight: ${weight};
  color: ${colors.grayMedium};
  transition: ${menuTransition};
`;

export const StyledLink = MenuNavItem.withComponent(NavLink).extend`
  text-align: center;
  ${props => (props.id !== 'logoIcon' ? linkActiveStyles : '')};
`;

export const StyledHref = MenuNavItem.withComponent('a').extend`
  position: relative;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${spacing.two} ${spacing.one} ${spacing.three};
  font-size: ${fontSize.p};
  font-weight: ${weight};
  color: ${colors.grayMedium};
  transition: ${menuTransition};

  ${linkActiveStyles};
`;

export const StyledButton = MenuNavItem.withComponent('button').extend`
  cursor: pointer;
  width: 6rem;
  border: none;
  background-color: ${colors.white};

  ${linkActiveStyles};
`;

export const Icon = styled.div`
  &:first-child {
    ${StyledLink} {
      margin-bottom: ${spacing.three};
    }
  }
`;

export const MenuIconWrapper = styled.div`
  margin-bottom: ${spacing.one};
`;

export const ChildrenDiv = styled.div`
  margin: ${props =>
    props.addMargin ? `0 ${spacing.four} 0 ${spacing.six}` : '0'};
`;

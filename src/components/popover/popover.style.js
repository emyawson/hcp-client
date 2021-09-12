import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import {
  boxShadow,
  zIndexes,
  borderRadius,
  transitions,
  transitionSpeed,
  transitionEasing,
  fadeIn,
} from 'src/core';
import { ListReset } from 'src/core/styles/resets';

import { POPOVER_LINK_ACTIVE_CLASS } from './popover.constants';

export const PopoverContainerDiv = styled.div`
  display: ${props => (props.show ? 'inherit' : 'none')};
  position: relative;
  top: 0;
  z-index: ${zIndexes.popover};
`;

export const PopoverRectangleContainer = styled.div`
  background-color: ${props => props.backgroundColor};
  border-radius: ${borderRadius.three};
  border-top: 3px solid ${props => props.theme.colors.brandBlue};
  box-shadow: ${props =>
    boxShadow({
      color: props.theme.colors.charcoal,
      depth: 'popover',
    })};
  left: ${props => `-${props.pushLeft}rem`};
  position: absolute;
  width: ${props => `${props.width}rem`};

  animation: ${fadeIn} ${transitionSpeed.fast} ${transitionEasing.enter}
    backwards;
`;

export const PopoverListContainerDiv = styled.div`
  padding-top: ${props => props.theme.spacing.four};
`;
PopoverListContainerDiv.displayName = 'PopoverListContainerDiv';

export const PopoverListHeader = styled.h2`
  border-bottom: 1px solid ${props => props.theme.colors.grayLighter};
  color: ${props => props.theme.colors.charcoal};
  font-size: ${props => props.theme.fontSize.title};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  margin: 0 ${props => props.theme.spacing.four} 0;
  padding-bottom: ${props => props.theme.spacing.three};
  text-transform: capitalize;
`;
PopoverListHeader.displayName = 'PopoverListHeader';

export const PopoverList = ListReset.extend`
  color: ${props => props.theme.colors.grayDark};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  font-size: ${props => props.theme.fontSize.p};
`;
PopoverList.displayName = 'PopoverList';

export const PopoverListItem = styled.li``;
PopoverListItem.displayName = 'PopoverListItem';

export const PopoverListItemLink = styled(NavLink)`
  border-left: 3px solid ${props => props.theme.colors.clear};
  color: ${props => props.theme.colors.grayDark};
  display: block;
  padding: ${props =>
    `${props.theme.spacing.three} ${props.theme.spacing.four}`};
  text-decoration: none;
  text-transform: capitalize;
  transition: ${transitions.default};
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.silverLight};
    color: ${props => props.theme.colors.charcoal};
  }

  &:active,
  &.${POPOVER_LINK_ACTIVE_CLASS} {
    border-color: ${props => props.theme.colors.brandBlue};
    color: ${props => props.theme.colors.brandBlue};
  }
`;
PopoverListItemLink.displayName = 'PopoverListItemLink';

export const PopoverListItemLinkTextSpan = styled.span`
  text-decoration: none;
`;
PopoverListItemLinkTextSpan.displayName = 'PopoverListItemLinkTextSpan';

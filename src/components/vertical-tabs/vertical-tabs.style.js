import styled from 'styled-components';

import { borderRadius, colors, spacing } from 'src/core';
import { convertPxToRem } from 'src/utils';

export const Container = styled.div`
  flex: 1;
  display: flex;
  border-top: 0.0625rem solid ${colors.grayLight};
  height: 100%;
  height: ${props => props.minHeight};
  min-height: ${props => props.minHeight};
`;

export const Nav = styled.nav`
  flex-shrink: 1;
`;

export const NavTabsList = styled.ul`
  list-style-type: none;
  border-right: 0.0625rem solid ${colors.grayLight};
  height: 100%;
  padding: 0;
  margin: 0;
  width: 2.5rem;
`;

export const NavTabsListItem = styled.li`
  cursor: pointer;
  border-bottom: 0.0625rem solid ${colors.grayLight};
  margin-right: ${props => (props.selected ? '-0.0625rem' : '0')};
  border-right: ${props =>
    props.selected ? `0.0625rem solid ${colors.white}` : 'none'};
  ${props =>
    props.selected && props.selectedStyle ? props.selectedStyle : null};
  &:hover {
    ${props => (props.selectedStyle ? props.selectedStyle : null)};
  }

  height: 2.5rem;
`;
NavTabsListItem.displayName = 'NavTabsListItem';

export const SelectedLine = styled.div`
  display: inline-block;
  height: 1.5rem;
  position: relative;
  top: ${spacing.two};
  border-left: ${props =>
    props.show
      ? `${convertPxToRem(3)} solid ${colors.blue}`
      : `${convertPxToRem(3)} solid transparent`};
  border-radius: ${borderRadius.three};
`;

export const NavTabsListItemText = styled.div`
  display: inline-block;
  padding: ${spacing.one} ${spacing.two};
`;

export const ContentContainer = styled.section`
  flex: 1;
  padding: 0 ${spacing.one};
`;

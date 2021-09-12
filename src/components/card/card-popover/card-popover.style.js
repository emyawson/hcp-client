import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { breakpoints, colors, spacing, fontSize } from 'src/core';
import { weight } from 'src/components/fonts/weights';
import { combineRems, invertRem } from 'src/utils';

export const PopoverContainerDiv = styled.div`
  position: absolute;
  top: ${combineRems(spacing.four, spacing.two)};
  right: ${combineRems(spacing.five, spacing.two)};

  @media (min-width: ${breakpoints.medium}) {
    top: ${combineRems(spacing.four, spacing.three)};
    right: ${combineRems(spacing.five, spacing.two, spacing.one)};
  }

  @media (min-width: ${breakpoints.large}) {
    top: ${combineRems(spacing.five, invertRem(spacing.two))};
    right: ${combineRems(spacing.five, spacing.three, spacing.two)};
  }
`;

export const PopoverHeaderDiv = styled.div`
  color: ${colors.charcoal};
  font-size: ${fontSize.title};
  font-weight: ${weight.semiBold};
  border-bottom: 1px solid ${colors.silverMedium};
  padding-bottom: ${spacing.three};
  margin: ${spacing.four} ${spacing.four} 0;
`;

export const PopoverListUl = styled.ul`
  list-style: none;
  font-weight: ${weight.semiBold};
  font-size: ${fontSize.p};
  margin: 0;
  padding: 0 0 ${spacing.three};
`;

export const PopoverListItemLi = styled.li`
  padding: 0 ${spacing.four};
  border-left: 3px solid ${colors.white};

  &:hover {
    background-color: ${colors.silverLight};
    border-left: 3px solid ${colors.silverLight};

    &:active {
      border-left: 3px solid ${colors.brandBlue};
    }
  }
`;

export const PopoverItemLinkA = styled(Link)`
  display: inline-block;
  width: 100%;
  color: ${colors.grayDark};
  text-decoration: none;
  padding: 1rem 0;

  &:hover {
    color: ${colors.charcoal};
  }

  &:active {
    color: ${colors.brandBlue};
  }
`;

export const PopoverItemLinkTextSpan = styled.span`
  text-decoration: none;
`;

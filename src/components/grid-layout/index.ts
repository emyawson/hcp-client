import styled, { StyledFunction } from 'styled-components';
import { textAlign } from 'styled-system';

import { breakpoints, colors, spacing } from 'src/core';

import { CardSection } from '../card/card-base/card-base.style';

const gridContainerColumns = 12;
const gridSpacing = spacing.four; // 2rem
const gridSpacingSmall = spacing.three; // 1rem
const gridSupport = 'display: grid'; // @supports query str

// CSS Grid wrapper
// Used as outer container for scenes
// Fallback style sets bottom padding to match grid-gap
export type GridContainerProps = {
  marginTop?: number;
  marginBottom?: number;
  gridTemplateRows?: number;
  columns?: number;
  gridSpacing?: string;
};

const GridContainerDiv: StyledFunction<
  GridContainerProps & React.HTMLProps<HTMLInputElement>
> =
  styled.div;

export const GridContainer = GridContainerDiv`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: ${props =>
    props.marginTop ? spacing.four : '0'} -${gridSpacingSmall}
    ${props => (props.marginBottom ? spacing.four : '0')};
  min-width: 100%;
  height: ${props => (props.height ? props.height : 'initial')};

  @supports (${gridSupport}) {
    display: grid;
    grid-template-rows: ${props =>
      props.gridTemplateRows ? props.gridTemplateRows : 'initial'};
    grid-template-columns: repeat(${props =>
      props.columns || gridContainerColumns}, 1fr);
    grid-gap: ${props => props.gridSpacing || gridSpacing};
    grid-auto-flow: dense;
    margin-left: 0;
    margin-right: 0;
  }
`;
GridContainer.displayName = 'GridContainer';

// Convert grid item width to a percentage for use in Flexbox fallback
// Ex. span=3 will cover 3 / 12 columns
const calculateWidthFromGridSpan = (span, columns = gridContainerColumns) => {
  const percentageWidth = (span / columns) * 100;
  return `${percentageWidth}%`;
};

// CSS Grid child - item column width set by prop 'span'

export type GridItemProps = {
  span: string | number;
  minHeight?: string;
  columns?: number;
};

const GridItemDiv: StyledFunction<GridItemProps> = styled.div;

export const GridItem = GridItemDiv`
  padding: ${gridSpacingSmall};
  flex: 1 1 ${props => calculateWidthFromGridSpan(props.span, props.columns)};
  flex-wrap: wrap;
  max-width: ${props => calculateWidthFromGridSpan(props.span, props.columns)};
  min-height: ${props => (props.minHeight ? props.minHeight : 'initial')};
  ${textAlign};

  @supports (${gridSupport}) {
    display: block;
    flex: none;
    grid-column: span ${props => props.span};
    padding: 0;
    max-width: 100%;
    height: 100%;
  }
`;
GridItem.displayName = 'GridItem';

// By default, extend grid items to full width
GridItem.defaultProps = {
  span: gridContainerColumns,
};

// Created for correcting padding removal not beign applied in IE11
export const GridItemWithoutPadding = GridItem.extend`
  padding: 0;
`;
GridItemWithoutPadding.displayName = 'GridItemWithoutPadding';

export const GridItemWithoutVerticalPadding = GridItem.extend`
  padding-bottom: 0;
  padding-top: 0;
`;
GridItemWithoutVerticalPadding.displayName = 'GridItemWithoutVerticalPadding';

// Create a grid container with card styling
// Intended to house other card components inside with no visible outer padding
const ContainerCard = CardSection.withComponent('div');
export const GridContainerCard = ContainerCard.extend`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  width: 100%;

  @media (min-width: ${breakpoints.medium}) {
    padding: 0;
  }

  @media (min-width: ${breakpoints.large}) {
    padding: 0;
  }

  @supports (${gridSupport}) {
    display: grid;
    grid-template-columns: repeat(${gridContainerColumns}, 1fr);
    grid-gap: 0;
    grid-auto-flow: dense;
    padding: 0;
  }

  & ${GridItem}, & ${GridItemWithoutPadding} {
    & > ${CardSection} {
      border-bottom: none;
      border-right: none;
      border-top: none;
      box-shadow: none;
      border-color: ${colors.silverDark};
    }

    &:first-child ${CardSection} {
      border-left: none;
    }
  }
`;
GridContainerCard.displayName = 'GridContainerCard';

export const FlexibleGridContainer = GridContainer.extend`
  @supports (${gridSupport}) {
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  }

  ${GridItem} {
    flex: 1;
    max-width: 100%;

    @supports (${gridSupport}) {
      grid-column: auto;
    }
  }
`;
FlexibleGridContainer.displayName = 'FlexibleGridContainer';

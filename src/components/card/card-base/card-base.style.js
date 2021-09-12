import styled from 'styled-components';

import {
  breakpoints,
  transitionSpeed,
  transitionEasing,
  borderRadius,
  colors,
  boxShadows,
} from 'src/core';

import { mapCardStyle, cardPadding } from '../card.style';

const cardBaseStyles = {
  default: {
    borderRadius: borderRadius.six,
    padding: cardPadding.default,
    paddingMediumBreakpoint: cardPadding.medium,
    paddingLargeBreakpoint: cardPadding.large,
    bgColor: colors.white,
    borderColor: colors.silverMedium,
    boxShadow: boxShadows.two,
    headerColor: colors.white,
    height: '100%',
    width: '100%',
  },
  primary: {
    bgColor: colors.white,
    borderColor: colors.silverMedium,
    boxShadow: boxShadows.two,
    headerColor: colors.white,
  },
  secondary: {
    bgColor: colors.silverLight,
    borderColor: colors.silverDark,
    boxShadow: 'none',
    headerColor: colors.silverLight,
  },
  blue: {
    bgColor: colors.lavender,
    borderColor: colors.quartzBlue,
    boxShadow: 'none',
    headerColor: colors.white,
  },
  noPadding: {
    padding: cardPadding.none,
    paddingMediumBreakpoint: cardPadding.none,
    paddingLargeBreakpoint: cardPadding.none,
  },
  patientDashboard: {
    minHeight: '17.8rem',
    flexDirection: 'column',
  },
  flexible: {
    display: 'flex',
  },
  flat: {
    boxShadow: 0,
  },
};
const mapCardBaseStyle = mapCardStyle(cardBaseStyles);

const cardContentStyles = {
  default: {
    color: colors.charcoal,
  },
  patientDashboard: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    innerDivWidth: '100%',
  },
};
const mapCardContentStyle = mapCardStyle(cardContentStyles);

export const CardSection = styled.section`
  background: ${mapCardBaseStyle('bgColor')};
  border: 1px solid ${mapCardBaseStyle('borderColor')};
  box-shadow: ${mapCardBaseStyle('boxShadow')};
  border-radius: ${mapCardBaseStyle('borderRadius')};
  padding: ${mapCardBaseStyle('padding')};
  min-height: ${mapCardBaseStyle('minHeight')};
  height: ${mapCardBaseStyle('height')};
  width: ${mapCardBaseStyle('width')};
  display: ${mapCardBaseStyle('display')};
  flex-direction: ${mapCardBaseStyle('flexDirection')};
  margin-top: ${mapCardBaseStyle('marginTop')};
  position: relative;
  transition: padding ${transitionSpeed.default} ${transitionEasing.default};

  @media (min-width: ${breakpoints.medium}) {
    padding: ${mapCardBaseStyle('paddingMediumBreakpoint')};
  }
  @media (min-width: ${breakpoints.large}) {
    padding: ${mapCardBaseStyle('paddingLargeBreakpoint')};
  }
`;
CardSection.defaultProps = {
  cardStyles: ['default'],
};
CardSection.displayName = 'CardSection';

export const CardContent = styled.div`
  color: ${colors.charcoal};
  flex: ${mapCardContentStyle('flex')};
  display: ${mapCardContentStyle('display')};
  justify-content: ${mapCardContentStyle('justifyContent')};
  & > div {
    width: ${mapCardContentStyle('innerDivWidth')};
  }
`;
CardContent.defaultProps = {
  cardStyles: ['default'],
};
CardContent.displayName = 'Content';

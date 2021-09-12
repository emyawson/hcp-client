import styled from 'styled-components';

import { colors, fontSize, borderRadius, spacing } from 'src/core';
import { weight } from 'src/components/fonts/weights';
import { combineRems } from 'src/utils';

import { mapCardStyle } from '../card.style';

const cardHeaderStyles = {
  blue: {
    bgColor: colors.lavender,
    borderBottomColor: colors.quartzBlue,
  },
  customClinicGuides: {
    borderBottomWidth: '1px',
    borderRadius: 0,
    margin: `0 auto ${combineRems(spacing.two, spacing.three)}`,
  },
  default: {
    bgColor: colors.white,
    borderBottomColor: colors.silverLight,
    borderBottomWidth: '3px',
    borderRadius: borderRadius.eight,
  },
  noHeaderBorder: {
    borderBottomColor: 'transparent',
  },
  secondary: {
    bgColor: colors.silverLight,
  },
};
const mapCardHeaderStyle = mapCardStyle(cardHeaderStyles);

const cardTitleStyles = {
  customClinicGuides: {
    textTransform: 'capitalize',
    titleAlign: 'left',
  },
  default: {
    fontSize: fontSize.subheading,
    margin: 0,
    textTransform: 'uppercase',
    titleAlign: 'center',
    titleColor: colors.charcoal,
    titleWeight: weight.semiBold,
    width: '100%',
  },
  patientDashboard: {
    borderBottom: `3px solid ${colors.brandBlue}`,
    borderRadius: '1px',
    fontSize: fontSize.p,
    letterSpacing: '1.1px',
    lineHeight: 1,
    margin: `1.125rem 0 -3px ${spacing.three}`,
    paddingBottom: '1.1875rem',
    paddingRight: spacing.one,
    titleAlign: 'left',
    width: 'auto',
  },
};
const mapCardTitleStyle = mapCardStyle(cardTitleStyles);

const cardIconDivStyles = {
  default: {},
  patientDashboard: {
    margin: `${spacing.three} ${spacing.three} 0 auto`,
  },
};
const mapCardIconDivStyle = mapCardStyle(cardIconDivStyles);

export const CardHeaderWrapper = styled.header`
  min-width: 100%;
  display: flex;
  align-items: flex-start;
  background-color: ${mapCardHeaderStyle('bgColor')};
  border-bottom: ${mapCardHeaderStyle('borderBottomWidth')} solid
    ${mapCardHeaderStyle('borderBottomColor')};
  border-radius: ${mapCardHeaderStyle('borderRadius')};
  margin: ${mapCardHeaderStyle('margin')};
`;
CardHeaderWrapper.defaultProps = {
  cardStyles: ['default'],
};
CardHeaderWrapper.displayName = 'CardHeaderWrapper';

export const CardTitle = styled.h2`
  overflow-wrap: break-word;
  width: ${mapCardTitleStyle('width')};
  margin: ${mapCardTitleStyle('margin')};
  font-size: ${mapCardTitleStyle('fontSize')};
  font-weight: ${mapCardTitleStyle('titleWeight')};
  text-transform: ${mapCardTitleStyle('textTransform')};
  text-align: ${mapCardTitleStyle('titleAlign')};
  color: ${mapCardTitleStyle('titleColor')};
  line-height: ${mapCardTitleStyle('lineHeight')};
  letter-spacing: ${mapCardTitleStyle('letterSpacing')};
  border-bottom: ${mapCardTitleStyle('borderBottom')};
  border-radius: ${mapCardTitleStyle('borderRadius')};
  padding-bottom: ${mapCardTitleStyle('paddingBottom')};
  padding-right: ${mapCardTitleStyle('paddingRight')};
`;
CardTitle.defaultProps = {
  cardStyles: ['default'],
};
CardTitle.displayName = 'CardTitle';

export const IconDiv = styled.div`
  margin: ${mapCardIconDivStyle('margin')};
  path {
    fill: ${colors.brandBlue};
  }
`;
IconDiv.defaultProps = {
  cardStyles: ['default'],
};
IconDiv.displayName = 'IconDiv';

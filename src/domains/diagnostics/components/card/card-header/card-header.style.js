import styled from 'styled-components';

import {
  borderRadius,
  colors,
  fontSize,
  spacing,
} from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';
import { combineRems } from 'src/domains/diagnostics/utils';

import { mapCardStyle } from '../card.style';

const cardHeaderStyles = {
  default: {
    bgColor: colors.white,
    borderBottomColor: colors.silverLight,
    borderRadius: borderRadius.eight,
    borderBottomWidth: '3px',
  },
  secondary: {
    bgColor: colors.silverLight,
  },
  blue: {
    bgColor: colors.lavender,
    borderBottomColor: colors.quartzBlue,
  },
  noHeaderBorder: {
    borderBottomColor: 'transparent',
  },
  customClinicGuides: {
    borderRadius: 0,
    borderBottomWidth: '1px',
    margin: `0 auto ${combineRems(spacing.two, spacing.three)}`,
  },
};
const mapCardHeaderStyle = mapCardStyle(cardHeaderStyles);

const cardTitleStyles = {
  default: {
    titleWeight: weight.semiBold,
    titleColor: colors.charcoal,
    fontSize: fontSize.subheading,
    titleAlign: 'center',
    textTransform: 'uppercase',
    margin: 0,
    width: '100%',
  },
  patientDashboard: {
    fontSize: fontSize.p,
    titleAlign: 'left',
    lineHeight: 1,
    letterSpacing: '1.1px',
    margin: `1.125rem 0 -3px ${spacing.three}`,
    borderBottom: `3px solid ${colors.brandBlue}`,
    borderRadius: '1px',
    paddingBottom: '1.1875rem',
    paddingRight: spacing.one,
    width: 'auto',
  },
  customClinicGuides: {
    titleAlign: 'left',
    textTransform: 'capitalize',
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

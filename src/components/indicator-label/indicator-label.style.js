import styled from 'styled-components';
import { path } from 'ramda';

import { borderRadius, colors, fontSize, spacing, transitions } from 'src/core';
import { weight } from 'src/components/fonts/weights';

const colorsByStatus = {
  active: {
    bg: colors.lavender,
    border: colors.quartzBlue,
    text: colors.blueMarine,
  },
  default: {
    bg: colors.silverLight,
    border: colors.silverDark,
    text: colors.grayMedium,
  },
  error: {
    bg: colors.trafficRed,
    border: colors.trafficRed,
    text: colors.white,
  },
};

const getColorByStatus = ({ active, error }, colorProp) =>
  active
    ? path(['active', colorProp], colorsByStatus)
    : error
      ? path(['error', colorProp], colorsByStatus)
      : path(['default', colorProp], colorsByStatus);

const marginDirectionToValues = direction => {
  const marginSize = spacing.two;
  switch (direction) {
    case 'top':
      return `${marginSize} 0 0 0`;
    case 'right':
      return `0 ${marginSize} 0 0`;
    case 'bottom':
      return `0 0 ${marginSize} 0 `;
    case 'left':
      return `0 0 0 ${marginSize}`;
    default:
      return '0';
  }
};

export const IndicatorLabelSpan = styled.span`
  background-color: ${props => getColorByStatus(props, 'bg')};
  border: 1px solid ${props => getColorByStatus(props, 'border')};
  border-radius: ${borderRadius.three};
  color: ${props => getColorByStatus(props, 'text')};
  display: inline-block;
  font-size: ${fontSize.label};
  font-weight: ${weight.bold};
  line-height: 1.1;
  margin: ${props => marginDirectionToValues(props.margin)};
  padding: ${spacing.one} ${spacing.two};
  transition: ${transitions.default};
`;

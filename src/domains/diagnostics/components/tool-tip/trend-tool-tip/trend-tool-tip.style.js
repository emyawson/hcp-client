// TODO: This is a port from the old hint component - need to update fixed values to correct spacing/rem values

import styled from 'styled-components';

import {
  colors,
  borderRadius,
  spacing,
  fontSize,
} from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components/fonts/weights';
import { convertPxToRem } from 'src/domains/diagnostics/utils';

export const toolTipWidth = 275;

export const ContainerDiv = styled.div`
  width: ${convertPxToRem(toolTipWidth)};
`;

export const TopBarDiv = styled.div`
  background-color: ${props => props.color || colors.charcoal};
  height: 0.4375rem;
`;

export const HintRowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${spacing.two};
`;

export const HintIconCircle = styled.div`
  border-radius: 0.8rem;
  border: 0.0625rem solid ${colors.grayDark};
  display: flex;
  height: 1.6rem;
  justify-content: space-around;
  padding: ${spacing.one};
  width: 1.6rem;
`;

export const NumOfTestsRowDiv = HintRowDiv.extend`
  align-items: center;
  border-bottom: 0.0625rem solid ${colors.silver};
`;

export const NumOfTestsTitleSpan = styled.span`
  font-size: ${fontSize.subheading};
`;

export const NumOfTestsSpan = styled.span`
  font-size: ${fontSize.headline};
`;

export const StatColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatDiv = styled.div`
  display: inline-block;
  padding: 0.9375rem 0 0 0;
`;

export const StatTitleDiv = styled.div`
  color: ${colors.grayDark};
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.06875rem;
  text-transform: uppercase;
`;

export const ColorIndicatorSpan = styled.span`
  background-color: ${props => props.color || colors.charcoal};
  border-radius: 0.25rem;
  display: inline-block;
  height: 0.4375rem;
  margin-right: ${spacing.two};
  width: 0.4375rem;
`;

export const StatNumSpan = styled.span`
  color: ${colors.grayDark};
  font-size: ${fontSize.subheading};
  font-weight: ${weight.semiBold};
  padding-right: ${spacing.one};
`;

export const StatUnitSpan = styled.span`
  color: ${colors.grayDark};
  font-size: ${fontSize.caption};
`;

export const HelpRowDiv = HintRowDiv.extend`
  justify-content: flex-end;
  height: 100%;
`;

export const HelpButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${borderRadius.eight};
  border: 0.0625rem solid ${colors.grayMedium};
  height: 1rem;
  width: 1rem;
  font-size: ${fontSize.caption};
  color: ${colors.grayMedium};
  background-color: ${colors.white};
`;

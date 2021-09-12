import styled from 'styled-components';

import { breakpoints, colors, fontSize, spacing } from 'src/core';
import { weight } from 'src/components/fonts/weights';
import { convertPxToRem, combineRems } from 'src/utils';

const colorBorder = colors.silver;

export const PrescriptionInfoTitle = styled.span`
  color: ${colors.grayMedium};
  font-size: ${fontSize.caption};
  font-weight: ${weight.bold};
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
`;

export const PrescriptionSubHeading = styled.span`
  color: ${colors.grayDark};
  font-size: ${fontSize.caption};
  font-weight: ${weight.bold};
  margin-top: ${spacing.two};
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
`;

export const PrescriptionSummaryCardContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  line-height: 1;
  width: 100%;
`;

export const PrescriptionSummaryCardHeaderDiv = styled.div`
  align-items: center;
  background: ${props => (props.active ? colors.lavender : colors.silverLight)};
  border-right: 1px solid
    ${props => (props.active ? colors.quartzBlue : colorBorder)};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  margin-bottom: ${props => (props.isNested && props.active ? '-1px' : '0')};
  min-width: ${convertPxToRem(150)};
  min-height: ${spacing.five};
`;

export const PrescriptionSummaryCardHeader = styled.h1`
  color: ${colors.grayDark};
  display: flex;
  flex-direction: column;
  font-size: ${fontSize.caption};
  font-weight: ${weight.semiBold};
  text-transform: uppercase;
`;

export const PrescriptionSummaryCardSubHeading = styled.h2`
  color: ${colors.brandBlue};
  display: flex;
  flex-direction: column;
  font-size: ${fontSize.caption};
  font-weight: ${weight.bold};
  margin-top: ${spacing.two};
  text-transform: uppercase;
`;

export const PrescriptionSummaryCardLineItem = styled.div`
  border: none;
  color: ${colors.grayDark};
  font-size: ${fontSize.p};
  font-weight: ${weight.light};
  margin: 0;
  padding: ${spacing.one} ${combineRems(spacing.two, spacing.three)};
  text-align: left;
  box-shadow: 12px 0px 1px -12px ${colors.grayMedium};

  &:first-child {
    box-shadow: none;
  }

  @media (min-width: ${breakpoints.large}) {
    padding: ${spacing.two} ${spacing.four};
  }
`;
export const PrescriptionSummaryCardLineItemNoInfo = PrescriptionSummaryCardLineItem.extend`
  text-align: center;
  width: 100%;
`;

export const PrescriptionSummaryCardLineItemBlock = styled.span`
  display: block;
`;

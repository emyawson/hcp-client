import styled from 'styled-components';

import { spacing } from 'src/core';
import { combineRems } from 'src/utils';
import { weight } from 'src/components/fonts';

export const GuideSummaryCardWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: ${spacing.three} ${combineRems(spacing.three, spacing.three)};
  background: ${props => props.theme.colors.lavender};
  width: 100%;
`;

export const CustomGuideHeader = styled.h1`
  color: ${props => props.theme.colors.brandBlue};
  font-size: ${props => props.theme.fontSize.subheading};
  font-weight: ${weight.bold};
  margin: 0;
  padding-bottom: ${spacing.two};
`;

export const CustomGuideSubheadingsRowDiv = styled.div`
  width: 100%;
  display: flex;
`;

export const CustomGuideLabelSubheading = styled.span`
  text-transform: uppercase;
  font-weight: ${weight.regular};
  font-size: ${props => props.theme.fontSize.label};
  padding-right: ${spacing.one};
`;

export const CustomGuideInfoSubheading = styled.span`
  text-transform: uppercase;
  font-weight: ${weight.bold};
  font-size: ${props => props.theme.fontSize.label};
`;
export const CustomGuideSubheadingWrapperDiv = styled.div`
  display: flex;
  padding: 0 ${spacing.two};
  border-right: 1px solid ${props => props.theme.colors.quartzBlue};
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    border-right: none;
  }
`;

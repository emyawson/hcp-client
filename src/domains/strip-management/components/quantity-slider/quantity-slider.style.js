import styled from 'styled-components';

import { combineRems } from 'src/utils';

export const QuantitySliderValuesDiv = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
`;

export const QuantitySliderValueSpan = styled.span`
  display: inline-block;
  font-size: ${props => props.theme.fontSize.title};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  margin: 0 ${props => props.theme.spacing.three};
  padding: 0 ${props => props.theme.spacing.one}
    ${props => props.theme.spacing.one};
  border-bottom: 2px solid ${props => props.theme.colors.quartzBlue};
`;

export const QuantitySliderContainerDiv = styled.div`
  margin: ${props => props.theme.spacing.three} auto
    ${props => combineRems(props.theme.spacing.one, props.theme.spacing.three)};
`;

export const QuantitySliderRangeSpan = styled.span`
  color: ${props => props.theme.colors.grayMedium};
  font-size: ${props => props.theme.fontSize.subheading};
`;

export const QuantitySliderLabel = styled.span`
  color: ${props => props.theme.colors.grayMedium};
  font-size: ${props => props.theme.fontSize.p};
`;

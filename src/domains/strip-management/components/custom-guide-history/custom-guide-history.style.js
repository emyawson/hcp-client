import styled from 'styled-components';

import { borderRadius, spacing, colors, fontSize } from 'src/core/styles';
import { Button, weight } from 'src/components';
import { combineRems } from 'src/utils';

export const CustomGuideHistoryWrapperDiv = styled.div`
  padding: ${props => props.theme.spacing.four} 0;
`;

export const CustomGuideDetailsItemWrapper = styled.div`
  display: flex;
  padding: ${spacing.three} 0 ${spacing.four} 0;
  width: 100%;
`;

export const RemoveCustomGuideRowDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid ${props => props.theme.colors.silverMedium};
`;

export const RemoveCustomGuideButton = styled(Button)`
  border-color: ${colors.lavender} ${colors.lavender} ${colors.lavender}
    ${colors.silverMedium};
  border-width: 1px;
  border-radius: 0 0 ${borderRadius.six} 0;
  background: ${colors.lavender};
  padding: ${combineRems(spacing.two, spacing.three)} 0;
  &:hover {
    border: 1px solid ${colors.brandBlue};
    background: ${colors.lavender};
  }
  &[disabled] {
    border-color: ${colors.white} ${colors.white} ${colors.white}
      ${colors.silver};
  }
`;

export const GuideHistoryPageNavigationWrapperDiv = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid ${colors.silver};
  justify-content: center;
  border-radius: ${borderRadius.two};
  padding: ${combineRems(spacing.one, spacing.three)};
`;

export const GuideHistoryPageNumberButton = styled(Button)`
  border-radius: 50%;
  height: ${combineRems(spacing.one, spacing.four)};
  width: ${combineRems(spacing.one, spacing.four)};
  padding: ${spacing.one};
  margin: 0 ${spacing.two};
  color: ${props => (props.isSelected ? colors.silver : colors.brandBlue)};
  background-color: ${props =>
    props.isSelected ? colors.brandBlue : colors.silver};
  min-width: auto;
  border: 0;
`;

export const GuideHistoryPageNavButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${colors.brandBlue};
  cursor: pointer;
  font-weight: ${weight.bold};
  font-size: ${fontSize.p};
  &:focus {
    outline: none;
    border: 1px solid ${colors.brandBlue};
  }
  &:hover {
    color: ${colors.brandBlueDark};
  }
  &:hover path {
    fill: ${colors.brandBlueDark};
  }
  &[disabled] {
    opacity: 0.3;
    pointer-events: none;
  }
`;

export const GuideHistoryPageNavLabel = styled.span`
  padding: ${spacing.two};
`;

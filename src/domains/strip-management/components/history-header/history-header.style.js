import styled from 'styled-components';

import { weight } from 'src/components/fonts/weights';
import { borderRadius, colors, spacing } from 'src/core';
import { combineRems } from 'src/utils';

export const HistoryHeaderDiv = styled.div`
  background: ${props => props.theme.colors.blueMarineAlpha};
  border-radius: ${borderRadius.three};
  margin-bottom: ${props => props.theme.spacing.four};
  padding: ${props =>
    `${combineRems(props.theme.spacing.two, props.theme.spacing.three)} ${
      props.theme.spacing.four
    }`};
  text-transform: uppercase;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HistoryHeaderTitle = styled.h2`
  color: ${props => props.theme.colors.blue};
  font-size: ${props => props.theme.fontSize.p};
  font-weight: ${weight.semiBold};
  margin: 0;
`;

export const GuideFiltersWrapperDiv = styled.div`
  font-size: ${props => props.theme.fontSize.caption};
  display: flex;
`;

export const GuideFiltersLabelSpan = styled.span`
  color: ${colors.grayDark};
  padding-right: ${spacing.one};
`;

export const GuideFilterDiv = styled.div`
  color: ${props => (props.active ? colors.brandBlue : colors.grayDark)};
  padding: 0 ${spacing.one};
  cursor: pointer;
  &:last-child {
    border-left: 1px solid ${colors.silver};
    padding-right: 0;
  }
`;

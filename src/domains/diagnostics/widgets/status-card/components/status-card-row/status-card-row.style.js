import styled from 'styled-components';

import { spacing, fontSize, colors } from 'src/domains/diagnostics/styles';
import { weight } from 'src/domains/diagnostics/components';

export const StatusCardRowWrapper = styled.div`
  display: flex;
  padding: ${spacing.three} 0;
  align-items: center;
  :nth-child(even) {
    border-top: 1px solid ${colors.grayLighter};
    border-bottom: 1px solid ${colors.grayLighter};
    align-items: flex-start;
  }
`;

StatusCardRowWrapper.displayName = 'StatusCardRowWrapper';

export const StatusCardDetailLabel = styled.div`
  font-weight: ${weight.semiBold};
  font-size: ${fontSize.subheading};
  flex: 1;
`;

StatusCardDetailLabel.displayName = 'StatusCardDetailLabel';

export const StatusCardDetailCaption = styled.div`
  margin-top: ${spacing.two};
  font-size: ${fontSize.caption};
`;

StatusCardDetailCaption.displayName = 'StatusCardDetailCaption';

export const StatusCardDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;

StatusCardDetail.displayName = 'StatusCardDetail';

export const StatusCardDetailWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

StatusCardDetailWrapper.displayName = 'StatusCardDetailWrapper';

export const TrafficLightContainer = styled.span`
  padding-right: ${props => props.theme.spacing.two};
`;

TrafficLightContainer.displayName = 'TrafficLightContainer';

import styled from 'styled-components';

import { colors, spacing, fontSize } from 'src/core';
import { weight } from 'src/components';
import { Headline, P } from 'src/components';

export const StripStatusDetailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto ${spacing.three};
  padding-top: ${spacing.three};
  width: 100%;
`;

export const StripStatusDetailsInnerWrapper = styled.div`
  height: auto;
  width: 100%;
  display: flex;
`;

export const StripStatusDetailsInnerItemSmall = styled.div`
  padding: ${spacing.two} 0;
`;

export const StripStatusDetailsInnerItemLarge = styled.div`
  flex-grow: 7;
  flex: 1;
  padding-left: ${spacing.four};
`;

export const StripStatusDetailsSubHeding = P.extend`
  width: 100%;
  font-weight: ${weight.bold};
  color: ${colors.black};
`;

export const StripStatusDetailsInfo = Headline.extend`
  height: auto;
  text-align: center;
  font-size: ${fontSize.headline};
`;

export const StripStatusDetailsProgressBarWrapper = styled.div`
  max-width: 100%;
  min-width: 100%;
  margin-top: ${spacing.two};
`;
export const StripStatusDetailsProgressBar = styled.div`
  height: ${spacing.one};
  max-width: ${props => props.stripsConsumedPercentage + '%'};
  background: ${props => props.color || colors.grayLight};
  margin-top: ${spacing.two};
`;

export const StripStatusNotificationWrapperDiv = styled.div`
  margin: 0 auto ${props => props.theme.spacing.two};
  width: 100%;
`;

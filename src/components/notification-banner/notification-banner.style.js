import styled from 'styled-components';

import { borderRadius } from 'src/core/styles';
import { hexToRGBA } from 'src/utils/color';

export const NotificationBannerDiv = styled.div`
  background-color: ${props => hexToRGBA(props.color, 0.05)};
  border: 1px solid ${props => hexToRGBA(props.color, 0.25)};
  border-radius: ${borderRadius.three};
  color: ${props => props.color};
  display: flex;
  line-height: 1;
  min-width: 100%;
  padding: ${props => props.theme.spacing.two};
`;

export const NotificationBannerIconSpan = styled.span`
  margin-right: ${props => props.theme.spacing.two};
  svg {
    display: block;
  }
`;

export const NotificationBannerMessageSpan = styled.span`
  font-size: ${props => props.theme.fontSize.p};
`;

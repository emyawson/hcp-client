import styled from 'styled-components';

import { NotificationBanner } from 'src/components';
import { combineRems } from 'src/utils';

export const InnerWrapperDiv = styled.div`
  width: 100%;
`;

export const NotificationWrapperDiv = styled.div`
  margin: 0 auto
    ${props => combineRems(props.theme.spacing.two, props.theme.spacing.three)};
`;

export const CenteredNotificationBanner = styled(NotificationBanner)`
  justify-content: center;
`;

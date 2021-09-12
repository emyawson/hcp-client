import React from 'react';

import { Link, Button } from 'src/components';
import { translate } from 'src/i18n';

import {
  HomeDeliveryCardContentContainer,
  HomeDeliveryCardButtonsDiv,
} from './home-delivery-card.style';

export const HomeDeliveryCardComponent = ({ routes, match }) => (
  <HomeDeliveryCardContentContainer>
    <HomeDeliveryCardButtonsDiv>
      <Link to={`${match.url}/delivery-configuration`}>
        <Button label={translate('homeStripDelivery.deliveryConfiguration')} />
      </Link>
      <Link to={`${match.url}/next-shipment`}>
        <Button label={translate('homeStripDelivery.deliveryStatus')} />
      </Link>
    </HomeDeliveryCardButtonsDiv>
  </HomeDeliveryCardContentContainer>
);

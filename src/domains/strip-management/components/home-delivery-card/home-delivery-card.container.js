import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { getCombinedRoutes } from 'src/navigation/navigation.selectors';

import { HomeDeliveryCardComponent } from './home-delivery-card.component';

const homeDeliveryConnector = createStructuredSelector({
  routes: getCombinedRoutes,
});

export const HomeDeliveryCard = compose(
  connect(homeDeliveryConnector),
  withRouter,
)(HomeDeliveryCardComponent);

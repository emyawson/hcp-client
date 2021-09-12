import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectDTCLink } from 'src/core/dtc/dtc.selectors';
import { getDTCLink } from 'src/core/dtc/dtc.actions';

import { DTCModalComponent } from './dtc-modal.component';

const DTCConnector = createStructuredSelector({
  url: selectDTCLink,
});

export const DTCModal = compose(
  connect(DTCConnector),
  lifecycle({
    componentDidMount() {
      const { dispatch } = this.props;
      dispatch(getDTCLink.start());
    },
  }),
)(DTCModalComponent);

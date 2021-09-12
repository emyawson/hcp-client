import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectHelpLink,
  selectIsHelpLoading,
} from 'src/core/help/help.selectors';
import { getHelpLink } from 'src/core/help/help.actions';

import { HelpComponent } from './help.component';

const helpConnector = createStructuredSelector({
  url: selectHelpLink,
  isLoading: selectIsHelpLoading,
});

export const HelpContainer = compose(
  connect(helpConnector),
  lifecycle({
    componentDidMount() {
      const { dispatch } = this.props;
      dispatch(getHelpLink.start());
    },
  }),
)(HelpComponent);

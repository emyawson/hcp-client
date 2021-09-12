import { connect } from 'react-redux';
import { compose } from 'recompose';

import { Navigation } from './navigation.component';

export const NavigationContainer = compose(connect(() => ({})))(Navigation);

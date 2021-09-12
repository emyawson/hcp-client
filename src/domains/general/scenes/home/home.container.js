import { compose } from 'recompose';

import { withNavigators } from 'src/utils/with-navigators';

import { HomeComp } from './home.component';

export const Home = compose(
  withNavigators({ hasLeftNav: true, hasTopNav: true }),
)(HomeComp);

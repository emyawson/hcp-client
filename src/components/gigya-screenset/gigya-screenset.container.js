import { compose, lifecycle } from 'recompose';
import { gigyaEventHandlers } from 'src/core/gigya';

import { GigyaScreenSetComponent } from './gigya-screenset.component';

export const GigyaScreenSet = compose(
  lifecycle({
    componentDidMount() {
      const { screenSetID, startScreen, ...props } = this.props;
      gigyaEventHandlers.accounts.showScreenSet({
        containerID: `gigya-screenset-${screenSetID}`,
        screenSet: screenSetID,
        startScreen,
        ...props,
      });
    },
  }),
)(GigyaScreenSetComponent);

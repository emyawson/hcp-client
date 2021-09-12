import { compose, lifecycle } from 'recompose';

import { gigyaEventHandlers } from 'src/core/gigya/gigya.events';

import { GigyaScreenSetComponent } from './gigya-screenset.component';
import { GigyaScreensetProps } from './gigya-screenset.types';

export const GigyaScreenSet = compose<GigyaScreensetProps, GigyaScreensetProps>(
  lifecycle<GigyaScreensetProps, null>({
    componentDidMount() {
      const { screenSetID, startScreen, ...props } = this.props;
      gigyaEventHandlers.accounts.showScreenSet({
        screenSet: screenSetID,
        startScreen,
        containerID: `gigya-screenset-${screenSetID}`,
        ...props,
      });
    },
  }),
)(GigyaScreenSetComponent);

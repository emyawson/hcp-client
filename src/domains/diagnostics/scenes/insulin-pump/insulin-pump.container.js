import { compose } from 'recompose';
import { connect } from 'react-redux';

import { insulinPumpConnector } from 'src/domains/diagnostics/scenes/insulin-pump/store/insulin-pump.selector';

import { InsulinPump } from './insulin-pump.component';

export const InsulinPumpContainer = compose(
  connect(
    insulinPumpConnector,
    null,
  ),
)(InsulinPump);

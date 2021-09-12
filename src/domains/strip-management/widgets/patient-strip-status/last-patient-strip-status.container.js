import { compose } from 'recompose';
import { connect } from 'react-redux';

import { mapDispatchers } from 'src/utils';

import { StripStatusCardExpanded } from './components';
import { lastPatientStripStatusConnector } from './last-patient-strip-status.selector';

const dispatchers = mapDispatchers({});

export const ExpandedLastPatientStripStatusContainer = compose(
  connect(
    lastPatientStripStatusConnector,
    dispatchers,
  ),
)(StripStatusCardExpanded);

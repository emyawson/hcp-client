import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapDispatchers } from 'src/domains/diagnostics/utils/map-dispatchers';
import { withToolTip } from 'src/domains/diagnostics/utils/with-tool-tip';
import { changeLogbookType } from 'src/domains/diagnostics/store/actions';

import { Metabolic } from './metabolic.component';
import { MetabolicConnector } from './metabolic.selector';

const dispatchers = mapDispatchers({ changeLogbookType });

export const MetabolicContainer = compose(
  withToolTip,
  withRouter,
  connect(
    MetabolicConnector,
    dispatchers,
  ),
)(Metabolic);

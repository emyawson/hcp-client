import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createModal, MODAL_TYPES } from 'src/domains/diagnostics/core';
import { mapDispatchers } from 'src/domains/diagnostics/utils';

import { BloodGlucoseGeneralStats } from './blood-glucose-general-stats.component';
import { BloodGlucoseGeneralStatsConnector } from './store/blood-glucose-general-stats.selector';

const disclaimers = [
  {
    titleKey: 'modals.disclaimer.hiLoControlResult.title',
    descKey: 'modals.disclaimer.hiLoControlResult.desc',
  },
  {
    titleKey: 'modals.disclaimer.standardBolus.title',
    descKey: 'modals.disclaimer.standardBolus.desc',
  },
];

const addHandlers = withHandlers({
  onClickDisclaimer: props => () => {
    const { createModal } = props;
    createModal({
      key: MODAL_TYPES.DISCLAIMER,
      data: {
        disclaimers,
        lastUpdateDate: new Date(2018, 2, 16),
      },
    });
  },
});

const dispatchers = mapDispatchers({
  createModal: createModal,
});

export const connectToBloodGlucoseStats = component =>
  compose(
    withRouter,
    connect(
      BloodGlucoseGeneralStatsConnector,
      dispatchers,
    ),
  )(component);

export const BloodGlucoseGeneralStatsContainer = compose(
  connectToBloodGlucoseStats,
  addHandlers,
)(BloodGlucoseGeneralStats);

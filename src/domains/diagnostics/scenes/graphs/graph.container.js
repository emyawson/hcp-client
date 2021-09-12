import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  changeGraph,
  changeGraphType,
  changeLogbookType,
} from 'src/domains/diagnostics/store/actions';
import { mapDispatchers } from 'src/domains/diagnostics/utils';
import {
  getTimeIntervalsRequest,
  getThresholdsRequest,
  fetchPatientRequest,
  fetchPatientDateRangeRequest,
  onPatientDateRangeChange,
  createModal,
  MODAL_TYPES,
} from 'src/domains/diagnostics/core';
import { graphConnector } from 'src/domains/diagnostics/scenes/graphs/graph.selector';

const disclaimers = [
  {
    titleKey: 'modals.disclaimer.hiLoControlResult.title',
    descKey: 'modals.disclaimer.hiLoControlResult.desc',
  },
  {
    titleKey: 'modals.disclaimer.flags.title',
    descKey: 'modals.disclaimer.flags.desc',
  },
  {
    titleKey: 'modals.disclaimer.timeAdjustments.title',
    descKey: 'modals.disclaimer.timeAdjustments.desc',
  },
];

const dispatchers = mapDispatchers({
  changeGraph,
  changeGraphType,
  changeLogbookType,
  onDatesChange: onPatientDateRangeChange,
  onFetchPatient: fetchPatientRequest.start,
  onFetchPatientDateRange: fetchPatientDateRangeRequest.start,
  getTimeIntervals: getTimeIntervalsRequest.start,
  getThresholdsRequest: getThresholdsRequest.start,
  createModal: createModal,
});

const addLifeCycles = lifecycle({
  componentDidMount() {
    const {
      onFetchPatient,
      onFetchPatientDateRange,
      getThresholdsRequest,
      getTimeIntervals,
      endDate,
      match: { params },
    } = this.props;
    const patientId = params.id;

    if (!endDate) {
      onFetchPatientDateRange({ patientId });
    }

    onFetchPatient({ patientId });
    getTimeIntervals({ patientId });
    getThresholdsRequest({ patientId });
  },
});

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

export const connectToGraphs = Component =>
  compose(
    connect(
      graphConnector,
      dispatchers,
    ),
    withRouter,
    addHandlers,
    addLifeCycles,
  )(Component);

export const connectGraphs = withNavigators => Component =>
  compose(
    withNavigators({ hasLeftNav: true, hasTopNav: true }),
    connectToGraphs,
  )(Component);

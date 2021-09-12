import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  fetchPatientRequest,
  fetchPatientDateRangeRequest,
  getThresholdsRequest,
  getTimeIntervalsRequest,
  createModal,
  MODAL_TYPES,
} from 'src/domains/diagnostics/core';
import { mapDispatchers } from 'src/domains/diagnostics/utils';
import {
  getClinicalData,
  onBloodGlucoseOverviewEndDateChange,
} from 'src/domains/diagnostics/store/actions';

import { BloodGlucoseOverview } from './blood-glucose-overview.component';
import {
  bloodGlucoseOverviewConnector,
  calculateEndDateAfterPagination,
  calculateBloodGlucoseStartDate,
  NUMBER_BLOOD_GLUCOSE_OVERVIEW_COLUMNS,
} from './store';

const disclaimers = [
  {
    titleKey: 'modals.disclaimer.testFrequency.title',
    descKey: 'modals.disclaimer.testFrequency.desc',
  },
  {
    titleKey: 'modals.disclaimer.hypoRisk.title',
    descKey: 'modals.disclaimer.hypoRisk.desc',
    bullets: [
      {
        headerKey: 'modals.disclaimer.hypoRisk.greenInfo',
        descKey: null,
      },
      {
        headerKey: 'modals.disclaimer.hypoRisk.orangeInfo',
        descKey: null,
      },
      {
        headerKey: 'modals.disclaimer.hypoRisk.redInfo',
        descKey: null,
      },
    ],
  },
  {
    titleKey: 'modals.disclaimer.variability.title',
    descKey: 'modals.disclaimer.variability.desc',
    footerDecKey: 'modals.disclaimer.variability.footerDesc',
    bullets: [
      {
        headerKey: 'modals.disclaimer.variability.greenInfo',
        descKey: null,
      },
      {
        headerKey: 'modals.disclaimer.variability.orangeInfo',
        descKey: null,
      },
      {
        headerKey: 'modals.disclaimer.variability.redInfo',
        descKey: null,
      },
    ],
  },
  {
    titleKey: 'modals.disclaimer.meanBloodGlucose.title',
    descKey: 'modals.disclaimer.meanBloodGlucose.desc',
  },
];

const getBloodGlucoseMeasurementsByProps = props => {
  const {
    match: { params },
    endDate,
    interval,
    getClinicalData,
  } = props;
  const patientId = params.id;

  const startDate = calculateBloodGlucoseStartDate(
    endDate,
    interval,
    NUMBER_BLOOD_GLUCOSE_OVERVIEW_COLUMNS,
  );

  getClinicalData({
    patientId,
    startDate: startDate.toString(),
    endDate: endDate.toString(),
  });
};

const addHandlers = withHandlers({
  onChangeInterval: props => interval => {
    const { onBloodGlucoseOverviewEndDateChange, lastMeasurementDate } = props;
    const endDate = lastMeasurementDate;

    getBloodGlucoseMeasurementsByProps({ ...props, interval, endDate });
    onBloodGlucoseOverviewEndDateChange(endDate.toJSDate());
  },
  onClickPager: props => pagerType => {
    const {
      onBloodGlucoseOverviewEndDateChange,
      endDate,
      interval,
      firstMeasurementDate,
      lastMeasurementDate,
    } = props;
    const newEndDate = calculateEndDateAfterPagination(
      pagerType,
      endDate,
      interval,
      firstMeasurementDate,
      lastMeasurementDate,
    );
    const date = {
      endDate: newEndDate,
    };

    getBloodGlucoseMeasurementsByProps({ ...props, ...date });
    onBloodGlucoseOverviewEndDateChange(newEndDate);
  },
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
  onFetchPatient: fetchPatientRequest.start,
  onFetchPatientDateRange: fetchPatientDateRangeRequest.start,
  getClinicalData: getClinicalData.start,
  getThresholds: getThresholdsRequest.start,
  onBloodGlucoseOverviewEndDateChange,
  getTimeIntervals: getTimeIntervalsRequest.start,
  createModal: createModal,
});

const addLifeCycles = lifecycle({
  componentDidMount() {
    const {
      onFetchPatient,
      onFetchPatientDateRange,
      getThresholds,
      match: { params },
      getTimeIntervals,
    } = this.props;
    const patientId = params.id;

    onFetchPatient({ patientId });
    onFetchPatientDateRange({ patientId });
    getBloodGlucoseMeasurementsByProps(this.props);
    getThresholds({ patientId });
    getTimeIntervals({ patientId });
  },
});

export const BloodGlucoseOverviewContainer = withNavigators =>
  compose(
    withNavigators({ hasLeftNav: true, hasTopNav: true }),
    withRouter,
    connect(
      bloodGlucoseOverviewConnector,
      dispatchers,
    ),
    addHandlers,
    addLifeCycles,
  )(BloodGlucoseOverview);

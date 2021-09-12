import { createStructuredSelector } from 'reselect';
import { path } from 'ramda';

import {
  selectPatientStartDate,
  selectPatientEndDate,
  selectPatientFirstMeasurementDate,
  selectPatientLastMeasurementDate,
} from 'src/domains/diagnostics/core';

export const selectLocale = path(['session', 'user', 'languageIsoCode']);

export const globalGraphOptionsConnector = createStructuredSelector({
  locale: selectLocale,
  startDate: selectPatientStartDate,
  endDate: selectPatientEndDate,
  firstMeasurementDate: selectPatientFirstMeasurementDate,
  lastMeasurementDate: selectPatientLastMeasurementDate,
});

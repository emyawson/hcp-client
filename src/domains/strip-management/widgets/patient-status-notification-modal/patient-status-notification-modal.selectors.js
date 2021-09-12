import { createStructuredSelector } from 'reselect';

import {
  selectLastTrafficLightStatus,
  selectLastTrafficLightStatusDateCalculatedFormatted,
  selectLastTrafficLightStatusConditions,
  selectLastTrafficLightStatusComment,
  selectHasLastTrafficLightStatusWithAlert,
} from 'src/core/strip-delivery';

export const PatientStatusNotificationModalConnector = createStructuredSelector(
  {
    lastTrafficLightStatus: selectLastTrafficLightStatus,
    lastTrafficLightStatusDateCalculated: selectLastTrafficLightStatusDateCalculatedFormatted,
    lastTrafficLightStatusConditions: selectLastTrafficLightStatusConditions,
    lastTrafficLightStatusComment: selectLastTrafficLightStatusComment,
    hasLastTrafficLightStatusWithAlert: selectHasLastTrafficLightStatusWithAlert,
  },
);

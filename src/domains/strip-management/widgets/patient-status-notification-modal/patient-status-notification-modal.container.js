import { connect } from 'react-redux';

import { PatientStatusNotificationModal } from './patient-status-notification-modal.component';
import { PatientStatusNotificationModalConnector } from './patient-status-notification-modal.selectors';

export const PatientStatusNotificationModalContainer = connect(
  PatientStatusNotificationModalConnector,
)(PatientStatusNotificationModal);

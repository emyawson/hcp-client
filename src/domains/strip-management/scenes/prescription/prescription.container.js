import { compose } from 'recompose';
import { connect } from 'react-redux';

import { mapDispatchers } from 'src/utils';
import {
  createPrescriptionEntry,
  getCurrentPrescriptionRequest,
  setActivePrescriptionForm,
} from 'src/core/prescription';

import { Prescription } from './prescription.component';
import { prescriptionConnector } from './store';

import { addPatientStripManagement } from '../patient-strip-management/patient-strip-management.container';

const dispatchers = mapDispatchers({
  setActivePrescriptionForm,
  createPrescription: createPrescriptionEntry,
  getCurrentPrescriptionRequest: getCurrentPrescriptionRequest.start,
});

export const PrescriptionContainer = compose(
  connect(
    prescriptionConnector,
    dispatchers,
  ),
  addPatientStripManagement,
)(Prescription);

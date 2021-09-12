import { createStructuredSelector } from 'reselect';
import { path } from 'ramda';

import { selectPatient } from 'src/core/patient';
import { selectClinicId, selectDepartmentId } from 'src/core/strip-delivery';
import { selectStripModels } from 'src/core/prescription';

export const selectPatientStockString = path(['stripDelivery', 'patientStock']);

export const patientStripManagementConnector = createStructuredSelector({
  clinicId: selectClinicId,
  departmentId: selectDepartmentId,
  patient: selectPatient,
  stripModels: selectStripModels,
});

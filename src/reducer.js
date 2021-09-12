import { combineReducers } from 'redux';
import { createForms } from 'react-redux-form';
import { routerReducer } from 'react-router-redux';

import { requestReducer, modalsReducer } from 'src/core';
import { prescriptionReducer } from 'src/core/prescription';
import { sessionReducer } from 'src/core/authentication/authentication.reducers';
import { patientStockReducer } from 'src/core/patient-stock';

import { alertsReducer } from './core/alerts';
import { patientDashboardReducer } from './dashboards/patient-dashboard/store/patient-dashboard.reducer';
import { domainsReducer } from './domains/store/domains.reducers';
import { stripDeliveryReducer } from './core/strip-delivery/strip-delivery.reducers';
import { patientSearchReducer } from './core/patient-search/patient-search.reducers';
import { patientReducer } from './core/patient/patient.reducers';
import { patientDateRangeReducer } from './domains/diagnostics/core/patient-date-range/patient-date-range.reducers';
import { orgStockReducer } from './core/org-stock/org-stock.reducers';
import { deviceAssignmentReducer } from './core/device-assignment';
import {
  permissionsReducer,
  patientPermissionsReducer,
} from './core/permissions/permissions.reducers';
import { dtcReducer } from './core/dtc/dtc.reducers';
import { helpReducer } from './core/help/help.reducers';
import { departmentReducer } from './core/department/department.reducers';
import { createPatientReducer } from './widgets/patient/create-patient/store/create-patient.reducer';
import { countriesReducer } from './core/countries/countries.reducer';

export const reducers = {
  router: routerReducer,
  request: requestReducer,
  session: sessionReducer,
  domains: domainsReducer,
  patient: patientReducer,
  alerts: alertsReducer,
  prescription: prescriptionReducer,
  permissions: permissionsReducer,
  patientPermissions: patientPermissionsReducer,
  orgStock: orgStockReducer,
  deviceAssignment: deviceAssignmentReducer,
  modals: modalsReducer,
  dtc: dtcReducer,
  help: helpReducer,
  department: departmentReducer,
  countries: countriesReducer,
  ...createForms({
    ui: combineReducers({
      patientDashboard: patientDashboardReducer,
      patientDateRange: patientDateRangeReducer,
    }),
    patientSearch: patientSearchReducer,
    deviceAssignmentPatientSearch: deviceAssignmentReducer,
    stripDelivery: stripDeliveryReducer,
    patientStock: patientStockReducer,
    createPatient: createPatientReducer,
  }),
};

const asyncReducers = {};

export const injectReducer = (store, { key, reducer }) => {
  if (typeof asyncReducers[key] !== 'undefined') {
    return;
  }

  asyncReducers[key] = reducer;

  store.replaceReducer(
    combineReducers({
      ...reducers,
      ...asyncReducers,
    }),
  );
};

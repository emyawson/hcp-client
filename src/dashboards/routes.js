import React from 'react';
import { Switch } from 'react-router-dom';

import { ProtectedRoute } from 'src/components/protected-route';
import { StripManagementDashboardInnerRoutes } from 'src/domains/strip-management/routes';
import { hasValue } from 'src/utils';

import { PatientDashboardBundle } from './bundles';
import { PatientDashboardLoading } from './patient-dashboard/patient-dashboard-loading.component';
import {
  connectWithDiagnosticsPermissionsLifecycle,
  hasPatientDiagnostics,
} from './patient-dashboard/patient-dashboard.utils';

export const patientLinks = {
  patientById: '/patients/:id',
};

export const DashboardRoutes = () => (
  <Switch>
    <ProtectedRoute
      exact
      path={patientLinks.patientById}
      component={connectWithDiagnosticsPermissionsLifecycle(
        ({ currentPermissions, ...routerProps }) =>
          hasValue(currentPermissions) ? (
            hasPatientDiagnostics(currentPermissions) ? (
              <PatientDashboardBundle {...routerProps} />
            ) : (
              <StripManagementDashboardInnerRoutes {...routerProps} />
            )
          ) : (
            <PatientDashboardLoading />
          ),
      )}
    />
  </Switch>
);

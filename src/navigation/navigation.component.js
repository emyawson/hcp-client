import React from 'react';
import { IndicatorsRoutes } from 'src/domains/indicators/routes';

import { DashboardRoutes } from 'src/dashboards/routes';
import { AuthenticationRoutes } from 'src/domains/authentication/routes';
import { DiagnosticsRoutes } from 'src/domains/diagnostics/routes';
import { GeneralRoutes } from 'src/domains/general/routes';
import { PatientRoutes } from 'src/domains/patient/routes';
import { ProfessionalRoutes } from 'src/domains/professional/routes';
import { ProfileRoutes } from 'src/domains/profile/routes';
import { StripManagementRoutes } from 'src/domains/strip-management/routes';
import { DeviceAssignmentRoutes } from 'src/domains/device-assignment/routes';
import { withNavigators } from 'src/utils/with-navigators';

export const Navigation = ({ match }) => [
  <AuthenticationRoutes key="authentication-routes" />,
  <GeneralRoutes key="general-routes" />,
  <DashboardRoutes key="dashboard-routes" />,
  <PatientRoutes key="patient-routes" />,
  <StripManagementRoutes key="strip-management-routes" />,
  <DiagnosticsRoutes
    key="diagnostics-routes"
    withNavigators={withNavigators}
  />,
  <IndicatorsRoutes key="indicators-routes" />,
  <ProfileRoutes key="profile" path="/profile" />,
  <ProfessionalRoutes key="professional-routes" />,
  <DeviceAssignmentRoutes key="device-assignment" />,
];

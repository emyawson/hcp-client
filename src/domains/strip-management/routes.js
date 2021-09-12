import React from 'react';
import { Switch } from 'react-router-dom';
import { map } from 'ramda';

import { RouterOutlet } from 'src/navigation/components/router-outlet';
import { ProtectedRoute } from 'src/components/protected-route/protected-route.container';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';
import { patientLinks } from 'src/dashboards/routes';

import {
  OrgStockBundle,
  StripDeliveryBundle,
  PrescriptionInformationBundle,
  AlertsBundle,
  CustomClinicGuidesBundle,
} from './bundles';
import { PatientStripManagementWrapper } from './scenes/patient-strip-management/patient-strip-management.container';
import { OrgStripManagementWrapper } from './scenes/org-strip-management/org-strip-management.container';

export const stripManagementLinks = {
  stock: '/stock',
  stripInfoByPatient: '/patients/:id/strip-information',
  prescriptionInfoByPatient: '/patients/:id/strip-information/prescription',
  alerts: '/patients/:id/strip-information/alerts',
  customClinicGuides:
    '/patients/:id/strip-information/prescription/guide-settings',
};

export const stripManagementDashboardLinks = {
  stripInfoByPatient: '/patients/:id',
  prescriptionInfoByPatient: '/patients/:id/prescription',
  alerts: '/patients/:id/alerts',
};

export const stripManagementInnerRoutes = map(link =>
  link.replace('/patients/:id/', ''),
)(stripManagementLinks);

export const stripManagementLinksByPatient = patientId =>
  map(link => link.replace('patients/:id', `patients/${patientId}`))(
    stripManagementLinks,
  );

export const StripManagementRoutes = () => (
  <Switch>
    <RouterOutlet path={stripManagementLinks.stripInfoByPatient}>
      <PatientStripManagementWrapper>
        <Switch>
          <ProtectedRoute
            exact
            path={stripManagementLinks.stripInfoByPatient}
            component={StripDeliveryBundle}
            hasPermissions={[PERMISSIONS.STRIP_TRAFFIC_LIGHT]}
          />
          <ProtectedRoute
            exact
            path={stripManagementLinks.prescriptionInfoByPatient}
            component={PrescriptionInformationBundle}
            hasPermissions={[
              PERMISSIONS.STRIP_TRAFFIC_LIGHT,
              PERMISSIONS.STRIP_PRESCRIPTIONS,
            ]}
          />
          <ProtectedRoute
            exact
            path={stripManagementLinks.alerts}
            component={AlertsBundle}
            hasPermissions={[
              PERMISSIONS.STRIP_TRAFFIC_LIGHT,
              PERMISSIONS.STRIP_PATIENT_ALERTS,
            ]}
          />
          <ProtectedRoute
            exact
            path={stripManagementLinks.customClinicGuides}
            component={CustomClinicGuidesBundle}
            hasPermissions={[
              PERMISSIONS.STRIP_TRAFFIC_LIGHT,
              PERMISSIONS.STRIP_PRESCRIPTIONS,
            ]}
          />
        </Switch>
      </PatientStripManagementWrapper>
    </RouterOutlet>
    <RouterOutlet path={stripManagementLinks.stock}>
      <OrgStripManagementWrapper>
        <Switch>
          <ProtectedRoute
            exact
            path={stripManagementLinks.stock}
            component={OrgStockBundle}
            hasPermissions={[PERMISSIONS.STRIP_TRAFFIC_LIGHT]}
          />
        </Switch>
      </OrgStripManagementWrapper>
    </RouterOutlet>
  </Switch>
);

export const StripManagementDashboardInnerRoutes = () => (
  <Switch>
    <RouterOutlet path={patientLinks.patientById}>
      <PatientStripManagementWrapper>
        <Switch>
          <ProtectedRoute
            exact
            path={stripManagementDashboardLinks.stripInfoByPatient}
            component={StripDeliveryBundle}
            hasPermissions={[PERMISSIONS.STRIP_TRAFFIC_LIGHT]}
          />
          <ProtectedRoute
            exact
            path={stripManagementDashboardLinks.prescriptionInfoByPatient}
            component={PrescriptionInformationBundle}
            hasPermissions={[
              PERMISSIONS.STRIP_TRAFFIC_LIGHT,
              PERMISSIONS.STRIP_PRESCRIPTIONS,
            ]}
          />
          <ProtectedRoute
            exact
            path={stripManagementDashboardLinks.alerts}
            component={AlertsBundle}
            hasPermissions={[
              PERMISSIONS.STRIP_TRAFFIC_LIGHT,
              PERMISSIONS.STRIP_PATIENT_ALERTS,
            ]}
          />
        </Switch>
      </PatientStripManagementWrapper>
    </RouterOutlet>
  </Switch>
);

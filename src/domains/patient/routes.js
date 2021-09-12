import React from 'react';
import { Switch } from 'react-router-dom';

import { ProtectedRoute } from 'src/components/protected-route';
import { PERMISSIONS } from 'src/core/permissions/permissions.constants';

import { CreatePatient } from './scenes/create-patient/index';
import { EditPatient } from './scenes/edit-patient';
import { DeactivatePatientIFrame } from './scenes/deactivate-patient';
import { EditTimePeriodsIFrame } from './scenes/edit-time-periods';
import { ListDevicesIFrame } from './scenes/list-devices';
import { ListTreatmentsIFrame } from './scenes/list-treatments';
import { GraphSettingsIFrame } from './scenes/graph-settings';
import { DeliveryConfigurationIFrame } from './scenes/delivery-configuration';
import { NextShipmentIframe } from './scenes/next-shipment';

export const patientLinks = {
  patientById: '/patients/:id',
  patients: '/patients',
  editPatient: '/patients/:id/edit',
  deactivatePatient: '/patients/:id/deactivate',
  createPatient: '/patient/create',
  editTimePeriods: '/patients/:id/time-periods',
  listDevices: '/patients/:id/devices',
  listTreatments: '/patients/:id/treatments',
  graphSettings: '/patients/:id/graph-settings',
  deliveryConfiguration: '/patients/:id/delivery-configuration',
  nextShipment: '/patients/:id/next-shipment',
};

export const PatientRoutes = () => (
  <Switch>
    <ProtectedRoute
      exact
      path={patientLinks.editPatient}
      component={EditPatient}
    />
    <ProtectedRoute
      exact
      path={patientLinks.deactivatePatient}
      component={DeactivatePatientIFrame}
    />
    <ProtectedRoute
      exact
      path={patientLinks.createPatient}
      component={CreatePatient}
    />
    <ProtectedRoute
      exact
      path={patientLinks.editTimePeriods}
      component={EditTimePeriodsIFrame}
    />
    <ProtectedRoute
      exact
      path={patientLinks.listDevices}
      component={ListDevicesIFrame}
    />
    <ProtectedRoute
      exact
      path={patientLinks.listTreatments}
      component={ListTreatmentsIFrame}
      hasPermissions={[PERMISSIONS.TREATMENT_LIST]}
    />
    <ProtectedRoute
      exact
      path={patientLinks.graphSettings}
      component={GraphSettingsIFrame}
    />
    <ProtectedRoute
      exact
      path={patientLinks.deliveryConfiguration}
      component={DeliveryConfigurationIFrame}
    />
    <ProtectedRoute
      exact
      path={patientLinks.nextShipment}
      component={NextShipmentIframe}
    />
  </Switch>
);

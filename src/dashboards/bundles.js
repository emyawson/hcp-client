import React from 'react';

import { Bundle } from 'src/navigation/bundle';

export const PatientDashboardBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        PatientDashboardContainer,
      } = await import(/* webpackChunkName: "patients-dashboard" */ './patient-dashboard');
      return PatientDashboardContainer;
    }}
    bundleDidLoad={PatientDashboardContainer => (
      <PatientDashboardContainer {...props} />
    )}
  />
);

import React from 'react';

import { Bundle } from 'src/navigation/bundle';

export const PatientsBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        PatientsContainer,
      } = await import(/* webpackChunkName: "patients" */ './scenes/patients');
      return PatientsContainer;
    }}
    bundleDidLoad={PatientsContainer => <PatientsContainer {...props} />}
  />
);

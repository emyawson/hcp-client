import React from 'react';

import { Column, LoadingRing } from 'src/components';

export const PatientDashboardLoading = () => (
  <Column align="center" height="100vh" justifyContent="center">
    <LoadingRing infinite />
  </Column>
);

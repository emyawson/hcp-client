import * as React from 'react';

import { GridContainer, GridItem } from 'src/components/grid-layout';
import { PatientSummaryBarContainer } from 'src/widgets/patient-summary-bar';

export const withPatientSummary = Component => props => (
  <GridContainer>
    <GridItem span="12">
      <PatientSummaryBarContainer />
    </GridItem>
    <GridItem span="12">
      <Component {...props} />
    </GridItem>
  </GridContainer>
);

import React from 'react';

import { LoadingRing } from 'src/components/loading-ring';
import { Column } from 'src/components/column';

export const GigyaScreenSetComponent = ({ screenSetID }) => (
  <div id={`gigya-screenset-${screenSetID}`}>
    <Column align="center" height="100vh" justifyContent="center">
      <LoadingRing infinite />
    </Column>
  </div>
);

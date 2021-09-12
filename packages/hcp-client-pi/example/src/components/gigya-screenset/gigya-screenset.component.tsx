import * as React from 'react';

import { GigyaScreensetProps } from 'src/components/gigya-screenset/gigya-screenset.types';

export const GigyaScreenSetComponent: React.StatelessComponent<
  GigyaScreensetProps
> = ({ screenSetID }) => (
  <div id={`gigya-screenset-${screenSetID}`} />
);

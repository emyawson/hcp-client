import React from 'react';

import { CircleMarkIcon } from 'src/domains/diagnostics/assets/icons';
import { colors } from 'src/domains/diagnostics/styles';

export const OrangeCircle = () => (
  <CircleMarkIcon
    fillColor={colors.trafficOrange}
    strokeColor={colors.trafficOrange}
  />
);

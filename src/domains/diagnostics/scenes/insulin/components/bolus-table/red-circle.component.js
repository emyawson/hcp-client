import React from 'react';

import { CircleMarkIcon } from 'src/domains/diagnostics/assets/icons';
import { colors } from 'src/domains/diagnostics/styles';

export const RedCircle = () => (
  <CircleMarkIcon fillColor={colors.red} strokeColor={colors.red} />
);

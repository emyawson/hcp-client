import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';
import { XShape } from 'src/domains/diagnostics/components/graph';

export const Mean = ({ x, y, width, onMouseMove, onMouseOut }) => (
  <XShape
    width={width}
    x={x}
    y={y}
    strokeColor={colors.brandBlue}
    onMouseMove={onMouseMove}
    onMouseOut={onMouseOut}
  />
);

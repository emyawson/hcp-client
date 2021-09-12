import React from 'react';

import { colors } from 'src/domains/diagnostics/styles';
import { RenderIf } from 'src/domains/diagnostics/utils';

export const BackgroundPanelsNonUniform = ({ width, height, panels }) => (
  <g>
    {panels.map(({ x1, x2, fillColor = colors.silverLight }, i) => (
      <RenderIf key={`${x2 - x1}, ${i}`} validate={x1 >= 0 && x2 >= 0}>
        <rect
          x={x1 * width}
          y={-height}
          width={x2 * width - x1 * width}
          height={height}
          fill={fillColor}
        />
      </RenderIf>
    ))}
  </g>
);

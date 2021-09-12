import React from 'react';

import { colors, strokeWidth } from 'src/domains/diagnostics/styles';
import { Plot } from 'src/domains/diagnostics/lib';
import { RenderIf } from 'src/domains/diagnostics/utils';

export const MetabolicEllipses = ({
  x,
  y,
  width,
  height,
  sd1,
  meanBGSD,
  yDirection = -1,
  padding = 0,
}) => {
  const { x: cx, y: cy } = meanBGSD;
  const { rx, ry } = sd1;

  return (
    <Plot
      id="standard-deviation-ellipses"
      x={x}
      y={y}
      width={width}
      height={height}
      padding={padding}
    >
      <RenderIf validate={!isNaN(cx)}>
        <ellipse
          cx={cx * width}
          cy={cy * height * yDirection}
          rx={rx * 2 * width}
          ry={ry * 2 * height}
          stroke={colors.blue}
          strokeWidth={strokeWidth.one}
          fill="transparent"
          strokeDasharray="1.6 3"
        />
        <ellipse
          cx={cx * width}
          cy={cy * height * yDirection}
          rx={rx * width}
          ry={ry * height}
          stroke={colors.blue}
          strokeWidth={strokeWidth.one}
          fill="transparent"
          strokeDasharray="1.6 3"
        />
      </RenderIf>
    </Plot>
  );
};

import React from 'react';

import { Graph, RadialPointSeries } from 'src/domains/diagnostics/lib';

export const PieChart = ({ diameter, segments }) => {
  const padding = diameter * 0.025;
  const paddedDiameter = diameter - padding * 2;
  const paddedRadius = paddedDiameter / 2;

  return (
    <Graph viewportRight={diameter} viewportBottom={diameter}>
      <RadialPointSeries
        diameter={diameter}
        rotation={-Math.PI / 2}
        padding={padding}
        segments={segments}
        Shape={({ start, end, center, value, fill, name }, index) => (
          <path
            key={name || index}
            d={`
                M ${center.x} ${center.y}
                L ${start.x} ${start.y}
                A ${paddedRadius} ${paddedRadius}
                  0 ${value > 0.5 ? 1 : 0} 1
                  ${end.x} ${end.y}
                z`}
            stroke="grey"
            strokeWidth={padding / 2}
            fill={fill}
          />
        )}
      />
    </Graph>
  );
};

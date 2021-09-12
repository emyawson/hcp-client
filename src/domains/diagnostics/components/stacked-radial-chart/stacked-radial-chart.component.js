import React from 'react';

import { Graph, RadialPointSeries } from 'src/domains/diagnostics/lib';

export const StackedRadialChart = ({ diameter, segments }) => {
  const padding = diameter * 0.1;
  const paddedDiameter = diameter - padding * 2;
  const paddedRadius = paddedDiameter / 2;

  return (
    <Graph viewportRight={diameter} viewportBottom={diameter}>
      <RadialPointSeries
        diameter={diameter}
        padding={padding}
        segments={segments}
        rotation={-Math.PI / 2}
        Shape={({ start, end, fill, value, name }, index) => (
          <path
            key={name || index}
            d={`
            M ${start.x} ${start.y}
            A ${paddedRadius} ${paddedRadius}
              0 ${value > 0.5 ? 1 : 0} 1
                ${Math.floor(end.x * 10000) / 10000} ${end.y} 
          `}
            strokeWidth={padding / 2}
            stroke={fill}
            fill="transparent"
          />
        )}
      />
    </Graph>
  );
};

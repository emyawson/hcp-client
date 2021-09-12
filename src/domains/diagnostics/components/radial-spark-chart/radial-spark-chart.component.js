import React from 'react';

import { Graph, RadialPointSeries } from 'src/domains/diagnostics/lib';

export const RadialSparkChart = ({ color, diameter, percentage }) => {
  const padding = diameter * 0.1;
  const paddedDiameter = diameter - padding * 2;
  const paddedRadius = paddedDiameter / 2;

  return (
    <Graph viewportRight={diameter} viewportBottom={diameter}>
      <circle
        cx={diameter / 2}
        cy={diameter / 2}
        r={paddedRadius}
        stroke="lightgrey"
        fill="transparent"
        strokeWidth={padding / 2}
      />
      <RadialPointSeries
        diameter={diameter}
        segments={[{ value: percentage }]}
        padding={padding}
        rotation={-Math.PI / 2}
        Shape={({ start, end, center, value, name }, index) => (
          <React.Fragment>
            <path
              key={name || index}
              d={`
                M ${start.x} ${start.y}
                A ${paddedRadius} ${paddedRadius}
                  0 ${value > 0.5 ? 1 : 0} 1
                  ${end.x} ${end.y}
              `}
              stroke={color}
              fill="transparent"
              strokeWidth={padding / 2}
            />
          </React.Fragment>
        )}
      />
    </Graph>
  );
};

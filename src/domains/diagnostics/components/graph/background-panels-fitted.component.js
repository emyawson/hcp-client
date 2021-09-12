import React from 'react';

export const BackgroundPanelsFitted = ({
  width,
  height,
  primary,
  secondary,
  count,
}) => {
  const panelWidth = width / count;
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => (
        <rect
          key={`${i}-${panelWidth}`}
          x={i * panelWidth}
          y={-height}
          width={panelWidth}
          height={height}
          fill={i % 2 ? primary : secondary}
        />
      ))}
    </g>
  );
};

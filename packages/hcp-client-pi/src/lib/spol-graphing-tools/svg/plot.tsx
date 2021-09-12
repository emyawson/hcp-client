import * as React from 'react';

interface PlotProps {
  x?: number;
  y?: number;
  width: number;
  height: number;
  id: string;
}

const translate = (x: PlotProps['x'], y: PlotProps['y']) =>
  `translate(${x}, ${y})`;

const url = (id: PlotProps['id']) => `url(#${id})`;

const Plot: React.SFC<PlotProps> = ({
  children,
  x = 0,
  y = 0,
  width,
  height,
  id,
}) => (
  <React.Fragment>
    <defs>
      <clipPath id={id}>
        <rect {...{ x: 0, y: -height, width, height }} />
      </clipPath>
    </defs>
    <g transform={translate(x, y + height)} clipPath={url(id)}>
      {children}
    </g>
  </React.Fragment>
);

export { Plot };

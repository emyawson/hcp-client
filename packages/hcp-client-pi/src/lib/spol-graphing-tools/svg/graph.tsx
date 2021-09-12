import * as React from 'react';

interface GraphProps {
  viewportRight: number;
  viewportBottom: number;
  viewportLeft?: number;
  viewportTop?: number;
  anchor?: string;
  cropping?: string;
  width?: number;
  height?: number;
}

const getAspectDirective = (
  anchor: GraphProps['anchor'],
  cropping: GraphProps['cropping'],
) => (anchor && cropping ? `${anchor} ${cropping}` : anchor);

const Graph: React.SFC<GraphProps> = ({
  children,
  viewportRight,
  viewportBottom,
  viewportLeft = 0,
  viewportTop = 0,
  anchor = '',
  cropping = '',
  width,
  height,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`${viewportLeft},${viewportTop},${viewportRight},${viewportBottom}`}
    preserveAspectRatio={getAspectDirective(anchor, cropping)}
    width={width}
    height={height}
  >
    {children}
  </svg>
);

export { Graph };

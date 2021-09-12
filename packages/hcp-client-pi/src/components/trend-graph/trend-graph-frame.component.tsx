import * as React from 'react';

import {
  X_AXIS_LINE_Y_OFFSET,
  Y_AXIS_HEIGHT,
  Y_AXIS_X_POS,
} from './trend-graph.constant';

import { GraphFrameType } from './trend-graph.type';

export const TrendGraphFrame: React.StatelessComponent<GraphFrameType> = ({
  width,
  height,
  yDirection = -1,
}) => {
  const maxY =
    yDirection * height * Y_AXIS_HEIGHT - height * X_AXIS_LINE_Y_OFFSET;

  return (
    <React.Fragment>
      <line
        x1={width * Y_AXIS_X_POS}
        x2={width * Y_AXIS_X_POS}
        y1={yDirection * height * X_AXIS_LINE_Y_OFFSET}
        y2={maxY}
        strokeWidth={1}
        stroke="#D8D8D8"
      />
      <line
        x1={width * Y_AXIS_X_POS}
        x2={width}
        y1={yDirection * height * X_AXIS_LINE_Y_OFFSET}
        y2={yDirection * height * X_AXIS_LINE_Y_OFFSET}
        strokeWidth={1}
        stroke="#D8D8D8"
      />
      <line
        x1={width * Y_AXIS_X_POS}
        x2={width}
        y1={maxY}
        y2={maxY}
        strokeWidth={1}
        stroke="#D8D8D8"
      />
      <line
        x1={width}
        x2={width}
        y1={yDirection * height * X_AXIS_LINE_Y_OFFSET}
        y2={maxY}
        strokeWidth={1}
        stroke="#D8D8D8"
      />
    </React.Fragment>
  );
};

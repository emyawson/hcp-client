import * as React from 'react';

import { VerticalAxis } from '@roche/patterns-indicators/components';

import { TrendGraphVerticalAxisType } from './trend-graph.type';

import {
  X_AXIS_LINE_Y_OFFSET,
  Y_AXIS_HEIGHT,
  Y_AXIS_TICK_LABEL_MARGIN,
  Y_AXIS_X_POS,
} from './trend-graph.constant';

export const TrendGraphVerticalAxis: React.StatelessComponent<
  TrendGraphVerticalAxisType
> = ({ width, height, verticalLabel, verticalTicks }) => (
  <React.Fragment>
    <VerticalAxis
      x={width * Y_AXIS_TICK_LABEL_MARGIN}
      y={height * X_AXIS_LINE_Y_OFFSET}
      height={height * Y_AXIS_HEIGHT}
      // tslint:disable-next-line:jsx-no-lambda
      Tick={tick => (
        <React.Fragment key={`${tick.value}`}>
          <line
            x1={0}
            x2={width * Y_AXIS_X_POS - width * Y_AXIS_TICK_LABEL_MARGIN}
            y1={tick.value}
            y2={tick.value}
            strokeWidth={1}
            stroke={tick.color ? tick.color : '#e6e6e9'}
          />
          <text
            y={tick.value}
            textAnchor="end"
            alignmentBaseline="text-after-edge"
            fill={tick.color ? tick.color : '#333'}
            fontSize={height * 0.03}
            dy="0.5em"
          >
            {tick.label}
          </text>
        </React.Fragment>
      )}
      ticks={verticalTicks}
    />
    <VerticalAxis
      x={(width * Y_AXIS_X_POS) / 3}
      y={height * X_AXIS_LINE_Y_OFFSET}
      height={height * Y_AXIS_HEIGHT}
      // tslint:disable-next-line:jsx-no-lambda
      Tick={tick => (
        <React.Fragment key={`${tick.value}`}>
          <text
            y={tick.value}
            textAnchor="middle"
            transform={`rotate(270, 0, ${tick.value})`}
            fontSize={height * 0.03}
          >
            {tick.label}
          </text>
        </React.Fragment>
      )}
      ticks={verticalLabel}
    />
  </React.Fragment>
);

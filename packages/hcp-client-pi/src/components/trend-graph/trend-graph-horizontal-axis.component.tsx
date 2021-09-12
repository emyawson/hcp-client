import * as React from 'react';

import { HorizontalAxis } from '@roche/patterns-indicators/components';

import { TrendGraphHorizontalAxisType } from './trend-graph.type';

import {
  DAY_RECT_HEIGHT,
  DAY_RECT_MARGIN,
  DAY_RECT_WIDTH,
  LONG_TICK,
  LONG_TICK_OFFSET,
  MONTH_LINE_X_OFFSET,
  MONTH_LINE_Y_OFFSET,
  RECT_RADIUS,
  SHORT_TICK,
  SHORT_TICK_OFFSET,
  X_AXIS_DAY_Y_OFFSET,
  X_AXIS_MONTH_Y_OFFSET,
  X_AXIS_WIDTH,
  Y_AXIS_X_POS,
  Y_AXIS_Y_POS,
} from './trend-graph.constant';

const DayTick = ({ tick, totalTicks, height, width, yDirection = -1 }) => {
  const adjustedWidth = width * X_AXIS_WIDTH;
  const rectangleHeight = height * DAY_RECT_HEIGHT;

  return (
    <React.Fragment>
      <rect
        x={tick.value + ((DAY_RECT_MARGIN / totalTicks) * adjustedWidth) / 2}
        y={yDirection * rectangleHeight}
        rx={RECT_RADIUS}
        ry={RECT_RADIUS}
        width={(DAY_RECT_WIDTH / totalTicks) * adjustedWidth}
        height={rectangleHeight}
        fill={tick.isWeekend ? 'rgba(93, 143, 223, 0.15)' : 'rgba(0, 0, 0, 0)'}
      />
      <line
        x1={tick.value}
        y1={yDirection * height * Y_AXIS_Y_POS}
        x2={tick.value}
        y2={
          tick.drawLongTick
            ? yDirection * height * LONG_TICK
            : yDirection * height * SHORT_TICK
        }
        strokeWidth={1}
        stroke="#D8D8D8"
      />
      <text
        textAnchor="middle"
        x={tick.value + ((1 / totalTicks) * adjustedWidth) / 2}
        y={
          tick.drawLongTick
            ? yDirection * height * LONG_TICK_OFFSET
            : yDirection * height * SHORT_TICK_OFFSET
        }
        fontSize={height * 0.03}
      >
        {tick.label}
      </text>
    </React.Fragment>
  );
};

const MonthTick = ({ tick, totalTicks, height, width, yDirection = -1 }) => {
  const monthLineOffset = width * MONTH_LINE_X_OFFSET;
  const adjustedWidth = width * X_AXIS_WIDTH;

  return (
    <React.Fragment>
      <line
        x1={tick.value + monthLineOffset}
        y1={yDirection * height * MONTH_LINE_Y_OFFSET}
        x2={
          tick.value +
          (tick.daysLeftInMonth / totalTicks) * adjustedWidth -
          monthLineOffset
        }
        y2={yDirection * height * MONTH_LINE_Y_OFFSET}
        strokeWidth={1}
        stroke="#D8D8D8"
      />
      <text
        textAnchor="start"
        x={tick.value}
        fontSize={height * 0.03}
        fontWeight={600}
      >
        {tick.label}
      </text>
    </React.Fragment>
  );
};

export const TrendGraphHorizontalAxis: React.StatelessComponent<
  TrendGraphHorizontalAxisType
> = ({ width, height, horizontalDayTicks, horizontalMonthTicks }) => (
  <React.Fragment>
    <HorizontalAxis
      x={width * Y_AXIS_X_POS}
      y={height * X_AXIS_DAY_Y_OFFSET}
      width={width * X_AXIS_WIDTH}
      // tslint:disable-next-line:jsx-no-lambda
      Tick={tick => (
        <DayTick
          tick={tick}
          height={height}
          width={width}
          totalTicks={horizontalDayTicks.length}
          key={tick.value}
        />
      )}
      ticks={horizontalDayTicks}
    />
    <HorizontalAxis
      x={width * Y_AXIS_X_POS}
      y={height * X_AXIS_MONTH_Y_OFFSET}
      width={width * X_AXIS_WIDTH}
      // tslint:disable-next-line:jsx-no-lambda
      Tick={tick => (
        <MonthTick
          tick={tick}
          height={height}
          width={width}
          totalTicks={horizontalDayTicks.length}
          key={tick.value}
        />
      )}
      ticks={horizontalMonthTicks}
    />
  </React.Fragment>
);

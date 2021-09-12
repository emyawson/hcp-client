import React from 'react';

import {
  VerticalAxis,
  HorizontalAxis,
  Plot,
} from 'src/domains/diagnostics/lib';
import { colors, strokeWidth } from 'src/domains/diagnostics/styles';
import { GRAPH_AXES_FONT_MULTIPLIER } from 'src/domains/diagnostics/scenes/graphs/graph.constants';

import {
  SHORT_TICK,
  SHORT_TICK_OFFSET,
  Y_AXIS_Y_POS,
  X_AXIS_WIDTH,
  Y_AXIS_X_POS,
  Y_AXIS_TICK_LABEL_MARGIN,
  Y_AXIS_HEIGHT,
  X_AXIS_DAY_Y_OFFSET,
  X_AXIS_DAY_HEIGHT,
  X_AXIS_LINE_Y_OFFSET,
} from '../../standard-week-detail.constant';

const Tick = ({ collapsed, tick, totalTicks, height, width, yDirection }) => {
  const adjustedWidth = width * X_AXIS_WIDTH;

  return (
    <React.Fragment>
      <line
        x1={tick.value}
        y1={yDirection * height * Y_AXIS_Y_POS}
        x2={tick.value}
        y2={yDirection * height * SHORT_TICK}
        strokeWidth={strokeWidth.one}
        stroke={colors.grayLight}
      />
      <text
        textAnchor="middle"
        x={tick.value + ((1 / totalTicks) * adjustedWidth) / 2}
        y={yDirection * height * SHORT_TICK_OFFSET}
        fontSize={
          collapsed
            ? height * GRAPH_AXES_FONT_MULTIPLIER.COLLAPSED
            : height * GRAPH_AXES_FONT_MULTIPLIER.EXPANDED
        }
      >
        {tick.label}
      </text>
    </React.Fragment>
  );
};

export const AxesPlot = ({
  collapsed,
  verticalTicks,
  verticalLabel,
  horizontalTicks,
  width,
  height,
  yDirection = -1,
}) => {
  const adjustedWidth = width * X_AXIS_WIDTH;
  const totalTicks = horizontalTicks.length;

  const maxY =
    yDirection * height * Y_AXIS_HEIGHT - height * X_AXIS_LINE_Y_OFFSET;

  return (
    <Plot id="main-axes" x={0} y={0} width={width} height={height}>
      <VerticalAxis
        x={width * Y_AXIS_TICK_LABEL_MARGIN}
        y={height * X_AXIS_LINE_Y_OFFSET}
        height={height * Y_AXIS_HEIGHT}
        axisColor={colors.grayLight}
        Tick={tick => (
          <React.Fragment key={`${tick.value}`}>
            <line
              x1={0}
              x2={width * Y_AXIS_X_POS - width * Y_AXIS_TICK_LABEL_MARGIN}
              y1={tick.value}
              y2={tick.value}
              strokeWidth={strokeWidth.one}
              stroke={tick.color ? tick.color : colors.silverDark}
            />
            <text
              y={tick.value}
              textAnchor="end"
              alignmentBaseline="text-after-edge"
              fill={tick.color ? tick.color : colors.black}
              fontSize={
                collapsed
                  ? height * GRAPH_AXES_FONT_MULTIPLIER.COLLAPSED
                  : height * GRAPH_AXES_FONT_MULTIPLIER.EXPANDED
              }
              dy="0.5em"
            >
              {tick.label}
            </text>
          </React.Fragment>
        )}
        ticks={verticalTicks}
      />
      <VerticalAxis
        x={(width * Y_AXIS_X_POS) / 2}
        y={height * X_AXIS_LINE_Y_OFFSET}
        height={height * Y_AXIS_HEIGHT}
        axisColor={colors.grayLight}
        Tick={tick => (
          <React.Fragment key={`${tick.value}`}>
            <text
              y={tick.value}
              textAnchor="middle"
              transform={`rotate(270, 0, ${tick.value})`}
              fontSize={
                collapsed
                  ? height * GRAPH_AXES_FONT_MULTIPLIER.COLLAPSED
                  : height * GRAPH_AXES_FONT_MULTIPLIER.EXPANDED
              }
            >
              {tick.label}
            </text>
          </React.Fragment>
        )}
        ticks={verticalLabel}
      />
      <HorizontalAxis
        x={width * Y_AXIS_X_POS}
        y={height * X_AXIS_DAY_Y_OFFSET}
        width={adjustedWidth}
        height={height * X_AXIS_DAY_HEIGHT}
        Tick={tick => (
          <Tick
            collapsed={collapsed}
            tick={tick}
            height={height}
            width={width}
            totalTicks={totalTicks}
            key={tick.value}
            yDirection={yDirection}
          />
        )}
        ticks={horizontalTicks}
        axisColor={colors.grayLight}
      />
      <line
        x1={width * Y_AXIS_X_POS}
        x2={width * Y_AXIS_X_POS}
        y1={yDirection * height * X_AXIS_LINE_Y_OFFSET}
        y2={maxY}
        strokeWidth={strokeWidth.one}
        stroke={colors.grayLight}
      />
      <line
        x1={width * Y_AXIS_X_POS}
        x2={width}
        y1={yDirection * height * X_AXIS_LINE_Y_OFFSET}
        y2={yDirection * height * X_AXIS_LINE_Y_OFFSET}
        strokeWidth={strokeWidth.one}
        stroke={colors.grayLight}
      />
      <line
        x1={width * Y_AXIS_X_POS}
        x2={width}
        y1={maxY}
        y2={maxY}
        strokeWidth={strokeWidth.one}
        stroke={colors.grayLight}
      />
      <line
        x1={width}
        x2={width}
        y1={yDirection * height * X_AXIS_LINE_Y_OFFSET}
        y2={maxY}
        strokeWidth={strokeWidth.one}
        stroke={colors.grayLight}
      />
    </Plot>
  );
};

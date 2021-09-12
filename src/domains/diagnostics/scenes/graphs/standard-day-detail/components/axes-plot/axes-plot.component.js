import React from 'react';

import {
  VerticalAxis,
  HorizontalAxis,
  Plot,
} from 'src/domains/diagnostics/lib';
import { colors, strokeWidth } from 'src/domains/diagnostics/styles';
import { GRAPH_AXES_FONT_MULTIPLIER } from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import { RenderIf } from 'src/domains/diagnostics/utils';

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
  TIME_INTERVAL_X_AXIS_DAY_Y_OFFSET,
} from '../../standard-day-detail.constant';

const TimeTick = ({
  collapsed,
  tick,
  totalTicks,
  height,
  width,
  yDirection,
}) => (
  <React.Fragment>
    <RenderIf validate={tick.value !== 0 || collapsed}>
      <line
        x1={tick.value}
        y1={yDirection * height * Y_AXIS_Y_POS}
        x2={tick.value}
        y2={yDirection * height * SHORT_TICK}
        strokeWidth={strokeWidth.one}
        stroke={colors.grayLight}
      />
      <text
        textAnchor={tick.isTickAtEndOfXAxis ? 'end' : 'middle'}
        x={tick.value}
        y={yDirection * height * SHORT_TICK_OFFSET}
        fontSize={
          collapsed
            ? height * GRAPH_AXES_FONT_MULTIPLIER.COLLAPSED
            : height * GRAPH_AXES_FONT_MULTIPLIER.EXPANDED
        }
      >
        {tick.label}
      </text>
    </RenderIf>
  </React.Fragment>
);

const TimeIntervalTick = ({ tick, height, width, yDirection, maxY }) => {
  const {
    value,
    icon,
    IconComponent = () => undefined,
    iconWidthScale,
    label,
    type,
    tickLine,
  } = tick;

  const iconWidth = (iconWidthScale * width) / 4;
  const textLabelFontSize = height * GRAPH_AXES_FONT_MULTIPLIER.EXPANDED;

  return (
    <React.Fragment key={`${value}`}>
      <RenderIf validate={icon}>
        <g
          key={`${value}`}
          transform={`translate(${value - iconWidth / 2}, ${height *
            X_AXIS_LINE_Y_OFFSET *
            0.05})`}
        >
          <IconComponent width={iconWidth} />
        </g>
      </RenderIf>

      <RenderIf validate={label}>
        <text textAnchor="middle" x={value} fontSize={textLabelFontSize}>
          {label}
        </text>
      </RenderIf>

      <RenderIf validate={tickLine && type === 'short'}>
        <line
          x1={tick.value}
          y1={height * X_AXIS_LINE_Y_OFFSET * 0.38}
          x2={tick.value}
          y2={height * X_AXIS_LINE_Y_OFFSET * 0.22}
          strokeWidth={strokeWidth.one}
          stroke={colors.grayLight}
        />
      </RenderIf>

      <RenderIf validate={tickLine && type === 'long'}>
        <line
          x1={tick.value}
          y1={height * X_AXIS_LINE_Y_OFFSET * 0.38}
          x2={tick.value}
          y2={0}
          strokeWidth={strokeWidth.one}
          stroke={colors.grayLight}
        />
      </RenderIf>
    </React.Fragment>
  );
};

export const AxesPlot = ({
  collapsed,
  verticalTicks,
  verticalLabel,
  timeHorizontalTicks,
  timeIntervalHorizontalTicks = [],
  width,
  height,
  yDirection = -1,
}) => {
  const adjustedWidth = width * X_AXIS_WIDTH;
  const totalTicks = timeHorizontalTicks.length;

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
          <TimeTick
            collapsed={collapsed}
            tick={tick}
            height={height}
            width={width}
            totalTicks={totalTicks}
            key={tick.value}
            yDirection={yDirection}
          />
        )}
        ticks={timeHorizontalTicks}
        axisColor={colors.grayLight}
      />
      <RenderIf validate={!collapsed}>
        <HorizontalAxis
          x={width * Y_AXIS_X_POS}
          y={height * TIME_INTERVAL_X_AXIS_DAY_Y_OFFSET}
          width={adjustedWidth}
          height={height * X_AXIS_DAY_HEIGHT}
          Tick={(tick, i) => (
            <TimeIntervalTick
              key={`${tick.value} - ${i}`}
              tick={tick}
              height={height}
              maxY={maxY}
              width={adjustedWidth}
              yDirection={yDirection}
            />
          )}
          ticks={timeIntervalHorizontalTicks}
          axisColor={colors.grayLight}
        />
      </RenderIf>
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

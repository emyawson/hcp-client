import React from 'react';
import { isNil } from 'ramda';

import { strokeWidth, colors } from 'src/domains/diagnostics/styles';
import { RenderIf } from 'src/domains/diagnostics/utils';
import { Plot, PointSeries, LineSeries } from 'src/domains/diagnostics/lib';
import {
  TargetRange,
  ThresholdLine,
  GridLines,
  XShape,
  SquareShape,
  TriangleShape,
  CircleShape,
} from 'src/domains/diagnostics/components/graph';
import {
  GRAPH_Y_INTERVAL,
  GRAPH_Y_MAX,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import { toolTipWidth } from 'src/domains/diagnostics/components/tool-tip/detail-tool-tip';
import { areDatesTheSameDay } from 'src/domains/diagnostics/scenes/graphs/graph.util';

import {
  Y_AXIS_HEIGHT,
  X_AXIS_WIDTH,
  Y_AXIS_Y_POS,
  Y_AXIS_X_POS,
} from '../../standard-week-detail.constant';

const FULL_OPACITY = 1;
const FADED_OPACITY = 0.1;

export const GraphPlot = ({
  height,
  width,
  yDirection,
  targetRange,
  threshold,
  horizontalTicks,
  showGridLines,
  lines,
  points,
  meanPoints,
  onLineClick = () => undefined,
  selectedDate,
  onPointMouseOver,
  onPointMouseOut,
  graphYMax = GRAPH_Y_MAX,
}) => (
  <Plot
    id="trend-detail"
    x={width * Y_AXIS_X_POS}
    y={height * Y_AXIS_Y_POS}
    height={height * Y_AXIS_HEIGHT}
    width={width * X_AXIS_WIDTH}
  >
    <RenderIf validate={showGridLines}>
      <GridLines
        width={width * X_AXIS_WIDTH}
        height={height * Y_AXIS_HEIGHT}
        horizontalCount={graphYMax / GRAPH_Y_INTERVAL}
        verticalCount={horizontalTicks.length}
      />
    </RenderIf>
    <TargetRange
      width={width * X_AXIS_WIDTH}
      height={height * Y_AXIS_HEIGHT}
      min={targetRange.min}
      max={targetRange.max}
    />
    <ThresholdLine
      width={width * X_AXIS_WIDTH}
      height={height * Y_AXIS_HEIGHT}
      threshold={threshold}
      yDirection={yDirection}
    />
    {lines.map(week =>
      week.map((points, index) => (
        <LineSeries
          key={index}
          points={points}
          width={width * X_AXIS_WIDTH}
          height={height * Y_AXIS_HEIGHT}
          Line={(a, b) => (
            <line
              key={`${a.x}${a.y}${b.x}${b.y}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              strokeWidth={
                areDatesTheSameDay(a.data.date, b.data.date) &&
                areDatesTheSameDay(a.data.date, selectedDate)
                  ? strokeWidth.four
                  : strokeWidth.one
              }
              stroke={
                areDatesTheSameDay(a.data.date, b.data.date) &&
                areDatesTheSameDay(a.data.date, selectedDate)
                  ? colors.turqoise
                  : colors.black
              }
              opacity={
                isNil(selectedDate) ||
                areDatesTheSameDay(a.data.date, selectedDate)
                  ? FULL_OPACITY
                  : FADED_OPACITY
              }
            />
          )}
        />
      )),
    )}
    <LineSeries
      points={meanPoints}
      width={width * X_AXIS_WIDTH}
      height={height * Y_AXIS_HEIGHT}
      Line={(a, b) => (
        <line
          key={`${a.x}${a.y}${b.x}${b.y}`}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          opacity={isNil(selectedDate) ? FULL_OPACITY : FADED_OPACITY}
          strokeWidth={strokeWidth.two}
          stroke={colors.black}
        />
      )}
    />
    {/* Invisible clickable lines */}
    {lines.map(week =>
      week.map((points, index) => (
        <LineSeries
          key={index}
          points={points}
          width={width * X_AXIS_WIDTH}
          height={height * Y_AXIS_HEIGHT}
          Line={(a, b) => (
            <line
              key={`${a.x}${a.y}${b.x}${b.y}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={colors.white}
              strokeWidth={10}
              opacity={0}
              onClick={onLineClick(a.data.date)}
            />
          )}
        />
      )),
    )}
    <PointSeries
      points={points}
      width={width * X_AXIS_WIDTH}
      height={height * Y_AXIS_HEIGHT}
      Shape={({ shape, x, y, strokeColor, fillColor, data }) => {
        let ShapeComponent;

        if (shape === 'triangle') {
          ShapeComponent = TriangleShape;
        } else if (shape === 'x') {
          ShapeComponent = XShape;
        } else {
          ShapeComponent = SquareShape;
        }

        return (
          <ShapeComponent
            width={width * X_AXIS_WIDTH}
            key={x * y}
            x={x}
            y={y}
            fillColor={
              isNil(selectedDate) || fillColor === colors.white
                ? fillColor
                : colors.lighterTurqoise
            }
            strokeColor={isNil(selectedDate) ? strokeColor : colors.turqoise}
            opacity={
              isNil(selectedDate) || areDatesTheSameDay(data.date, selectedDate)
                ? FULL_OPACITY
                : FADED_OPACITY
            }
            onClick={onLineClick(data.date)}
            onMouseMove={event => onPointMouseOver(event, data, toolTipWidth)}
            onMouseOut={onPointMouseOut}
          />
        );
      }}
    />
    <PointSeries
      points={meanPoints}
      width={width * X_AXIS_WIDTH}
      height={height * Y_AXIS_HEIGHT}
      Shape={({ shape, x, y, strokeColor, fillColor, data }) => (
        <CircleShape
          width={width * X_AXIS_WIDTH}
          key={`${x}${y}`}
          x={x}
          y={y}
          fillColor={fillColor}
          opacity={isNil(selectedDate) ? FULL_OPACITY : FADED_OPACITY}
          onMouseMove={event => onPointMouseOver(event, data, toolTipWidth)}
          onMouseOut={onPointMouseOut}
        />
      )}
    />
  </Plot>
);

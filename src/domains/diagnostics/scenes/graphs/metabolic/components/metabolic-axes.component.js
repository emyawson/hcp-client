import React from 'react';

import {
  Plot,
  VerticalAxis,
  HorizontalAxis,
} from 'src/domains/diagnostics/lib';
import { colors } from 'src/domains/diagnostics/styles';

export const AxesPlot = ({
  x,
  y,
  axisX,
  verticalTicks,
  verticalTicksDashboard,
  verticalLabel,
  horizontalTicks,
  horizontalLabel,
  width,
  height,
  innerPlotWidth,
  showDetails,
}) => {
  const axisTickFontSize = (width / 4) * 0.03;
  const axisLabelFontSize = (width / 4) * 0.035;

  return (
    <Plot id="main-axes" x={x} y={y} width={width} height={height}>
      <VerticalAxis
        x={axisX * 0.85}
        y={height * 0.1}
        height={height * 0.8}
        axisColor={colors.grayLight}
        Tick={(tick, index) => (
          <text
            key={`${tick.value}-${index}`}
            y={tick.value}
            textAnchor="end"
            fontSize={axisTickFontSize}
            fill={tick.fill || colors.grayDark}
            dy="0.5em"
          >
            {tick.label}
          </text>
        )}
        ticks={showDetails ? verticalTicks : verticalTicksDashboard}
      />
      <VerticalAxis
        x={axisX * 0.3}
        y={height * 0.1}
        height={height * 0.8}
        axisColor={colors.grayLight}
        Tick={(tick, index) => (
          <text
            key={`${tick.value}-${index}`}
            y={tick.value}
            textAnchor="middle"
            transform={`rotate(270, 0, ${tick.value})`}
            fontSize={axisLabelFontSize}
          >
            {tick.label}
          </text>
        )}
        ticks={verticalLabel}
      />
      <HorizontalAxis
        x={axisX}
        y={height * 0.05}
        width={innerPlotWidth - axisX}
        Tick={(tick, index) => (
          <text
            key={`${tick.value}-${index}`}
            textAnchor="middle"
            x={tick.value}
            fontSize={axisTickFontSize}
            fill={tick.fill || colors.grayDark}
          >
            {tick.label}
          </text>
        )}
        ticks={horizontalTicks}
        axisColor={colors.grayLight}
      />
      <HorizontalAxis
        x={axisX}
        y={height * 0.01}
        width={innerPlotWidth - axisX}
        Tick={(tick, index) => (
          <text
            key={`${tick.value}-${index}`}
            textAnchor="middle"
            x={tick.value}
            fontSize={axisLabelFontSize}
          >
            {tick.label}
          </text>
        )}
        ticks={horizontalLabel}
        axisColor={colors.grayLight}
      />
    </Plot>
  );
};

import React from 'react';

import { Plot } from 'src/domains/diagnostics/lib';
import {
  ThresholdLine,
  TargetRange,
  GridLines,
} from 'src/domains/diagnostics/components';
import { RenderIf } from 'src/domains/diagnostics/utils';

import { MetabolicPlotFrame } from './metabolic-plot-frame.component';

import {
  METABOLIC_GRAPH_Y_MAX,
  Y_TICK_INCREMENTS,
} from '../metabolic.constant';

export const MetabolicPlot = ({
  x,
  y,
  width,
  height,
  yDirection = -1,
  padding = 0,
  thresholds,
  toggles,
}) => (
  <Plot
    id="main-graph"
    x={x}
    y={y}
    width={width}
    height={height}
    padding={padding}
  >
    <RenderIf validate={toggles.gridLines}>
      <GridLines
        width={width}
        height={height}
        verticalCount={3}
        horizontalCount={METABOLIC_GRAPH_Y_MAX / Y_TICK_INCREMENTS}
      />
    </RenderIf>
    <ThresholdLine
      threshold={thresholds.hypoglycemiaThreshold / METABOLIC_GRAPH_Y_MAX}
      width={width}
      height={height}
      plotHeight={400}
    />
    <TargetRange
      min={thresholds.glucoseIdealIntervalMin / METABOLIC_GRAPH_Y_MAX}
      max={thresholds.glucoseIdealIntervalMax / METABOLIC_GRAPH_Y_MAX}
      width={width}
      height={height}
      plotHeight={400}
    />
    <MetabolicPlotFrame width={width} height={height} yDirection={yDirection} />
  </Plot>
);

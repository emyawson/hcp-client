import * as React from 'react';

import { SVGGraph, SVGPlot } from '@roche/patterns-indicators/lib/spol-graphing-tools';

import { GridLines } from '@roche/patterns-indicators/components';

import { TrendGraphAxes } from './trend-graph-axes.component';
import { TrendGraphWrapper } from './trend-graph.style';
import { TrendGraphType } from './trend-graph.type';

import {
  X_AXIS_WIDTH,
  Y_AXIS_HEIGHT,
  Y_AXIS_X_POS,
  Y_AXIS_Y_POS,
} from './trend-graph.constant';

export const TrendGraph: React.StatelessComponent<TrendGraphType> = ({
  width,
  height,
  verticalTicks,
  verticalLabel,
  horizontalDayTicks,
  horizontalMonthTicks,
}) => (
  <TrendGraphWrapper>
    <SVGGraph
      viewportRight={width}
      viewportBottom={height}
      height={height}
      anchor="xMidYMid"
    >
      <SVGPlot x={0} y={0} width={width} height={height} id="trend-plot">
        <TrendGraphAxes
          width={width}
          height={height}
          verticalLabel={verticalLabel}
          verticalTicks={verticalTicks}
          horizontalDayTicks={horizontalDayTicks}
          horizontalMonthTicks={horizontalMonthTicks}
        />
      </SVGPlot>
      <SVGPlot
        id="trend-trend"
        x={width * Y_AXIS_X_POS}
        y={height * Y_AXIS_Y_POS}
        height={height * Y_AXIS_HEIGHT}
        width={width * X_AXIS_WIDTH}
      >
        <GridLines
          width={width * X_AXIS_WIDTH}
          height={height * Y_AXIS_HEIGHT}
          verticalCount={horizontalDayTicks.length}
          horizontalCount={verticalTicks.length - 1}
        />
      </SVGPlot>
    </SVGGraph>
  </TrendGraphWrapper>
);

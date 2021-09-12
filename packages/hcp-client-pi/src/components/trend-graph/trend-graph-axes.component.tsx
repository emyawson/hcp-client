import * as React from 'react';

import { TrendGraphAxesType } from './trend-graph.type';

import { TrendGraphFrame } from './trend-graph-frame.component';
import { TrendGraphHorizontalAxis } from './trend-graph-horizontal-axis.component';
import { TrendGraphVerticalAxis } from './trend-graph-vertical-axis.component';

export const TrendGraphAxes: React.StatelessComponent<TrendGraphAxesType> = ({
  width,
  height,
  verticalLabel,
  verticalTicks,
  horizontalDayTicks,
  horizontalMonthTicks,
}) => (
  <React.Fragment>
    <TrendGraphVerticalAxis
      width={width}
      height={height}
      verticalLabel={verticalLabel}
      verticalTicks={verticalTicks}
    />
    <TrendGraphHorizontalAxis
      width={width}
      height={height}
      horizontalDayTicks={horizontalDayTicks}
      horizontalMonthTicks={horizontalMonthTicks}
    />
    <TrendGraphFrame width={width} height={height} />
  </React.Fragment>
);

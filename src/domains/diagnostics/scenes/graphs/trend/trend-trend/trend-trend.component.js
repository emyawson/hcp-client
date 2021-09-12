import React from 'react';
import { isEmpty } from 'ramda';

import { GraphDetail, ToolTip } from 'src/domains/diagnostics/components';
import {
  ResizeGraphWrapper,
  TrendToolTip,
} from 'src/domains/diagnostics/components';
import { Graph } from 'src/domains/diagnostics/lib';
import { RenderIf } from 'src/domains/diagnostics/utils';
import { withToolTip } from 'src/domains/diagnostics/utils/with-tool-tip';
import { filterVerticalTicksForViewAndVisibilityTolerance } from 'src/domains/diagnostics/utils/graphs.util';
import { withGraphLoader } from 'src/domains/diagnostics/utils';
import { EMPTY_VALUE_PLACEHOLDER } from 'src/domains/diagnostics/store/constants';

import { TrendAxesPlot, TrendGraphPlot } from '../components';
import { X_AXIS_WIDTH } from '../trend.constants';
import { TrendPlotWrapperDiv } from '../trend.style';
import { getToolTipValueColor } from '../../graph.util';
import { GraphDetailContainer } from '../../graph.style';
import { Y_AXIS_TICK_VISIBILITY_TOLERANCE } from '../../graph.constants';

const TrendPlotWrapperDivWithLoader = withGraphLoader(TrendPlotWrapperDiv);

export const TrendTrend = withToolTip(
  ({
    measurements,
    graphData,
    graphDetails,
    targetRange,
    threshold,
    verticalTicks,
    verticalLabel,
    horizontalDayTicks,
    horizontalMonthYearTicks,
    showGridLines,
    showGraphDetails = true,
    yDirection = -1,
    toolTip,
    showToolTip,
    hideToolTip,
    graphYMax,
    flexibleHeight,
    isLoading,
  }) => (
    <React.Fragment>
      <ResizeGraphWrapper
        render={layout => {
          const height = layout.height;
          const width = layout.width;

          const filteredVerticalTicks = filterVerticalTicksForViewAndVisibilityTolerance(
            verticalTicks,
            flexibleHeight,
            threshold,
            targetRange,
            Y_AXIS_TICK_VISIBILITY_TOLERANCE,
            graphYMax,
          );

          return (
            <TrendPlotWrapperDivWithLoader
              hasError={isEmpty(measurements) && !isLoading}
              isLoading={isLoading}
            >
              <RenderIf validate={width && height}>
                <Graph
                  viewportRight={width}
                  viewportBottom={height}
                  height={height}
                  anchor="xMidYMid"
                >
                  <TrendAxesPlot
                    verticalTicks={filteredVerticalTicks}
                    verticalLabel={verticalLabel}
                    horizontalDayTicks={horizontalDayTicks}
                    horizontalMonthYearTicks={horizontalMonthYearTicks}
                    width={width * 0.95}
                    height={height}
                    yDirection={yDirection}
                  />
                  <TrendGraphPlot
                    height={height}
                    width={width * X_AXIS_WIDTH}
                    yDirection={yDirection}
                    targetRange={targetRange}
                    threshold={threshold.value}
                    points={graphData}
                    horizontalDayTicks={horizontalDayTicks}
                    showGridLines={showGridLines}
                    onCandleStickMouseOver={showToolTip}
                    onCandleStickMouseOut={hideToolTip}
                    graphYMax={graphYMax}
                  />
                </Graph>
              </RenderIf>
            </TrendPlotWrapperDivWithLoader>
          );
        }}
      />
      <RenderIf
        validate={showGraphDetails && !isEmpty(measurements) && !isLoading}
      >
        <GraphDetailContainer>
          <GraphDetail graphStatistics={graphDetails} graphType="trend" />
        </GraphDetailContainer>
      </RenderIf>
      <RenderIf validate={toolTip.x && toolTip.y}>
        {renderToolTip(toolTip, threshold, targetRange)}
      </RenderIf>
    </React.Fragment>
  ),
);

const renderToolTip = (
  { x, y, data },
  { data: thresholdData },
  { data: targetRangeData },
) => {
  const { stdDev, max, min, mean, count } = data;

  return (
    <ToolTip x={x} y={y}>
      <TrendToolTip
        max={max}
        min={min}
        mean={mean && mean.toFixed(1)}
        numMeasurements={count}
        stDev={
          !stdDev || stdDev === EMPTY_VALUE_PLACEHOLDER
            ? stdDev
            : stdDev.toFixed(1)
        }
        meanColor={getToolTipValueColor(
          mean,
          thresholdData.value,
          targetRangeData,
        )}
        maxColor={getToolTipValueColor(
          max,
          thresholdData.value,
          targetRangeData,
        )}
        minColor={getToolTipValueColor(
          min,
          thresholdData.value,
          targetRangeData,
        )}
      />
    </ToolTip>
  );
};

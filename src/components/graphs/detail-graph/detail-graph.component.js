import React, { Component } from 'react';
import {
  Borders,
  FlexibleWidthXYPlot,
  Hint,
  VerticalGridLines,
  HorizontalGridLines,
} from 'react-vis';
import { withRouter } from 'react-router-dom';
import { Subject } from 'rxjs/Subject';
import { isEmpty } from 'ramda';

import { COLLAPSED_DETAIL_GRAPH_HEIGHT } from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import { colors } from 'src/core/styles/colors';
import { AppleIcon, AppleEatenIcon } from 'src/assets/icons';
import { MealTimes } from 'src/components';

import { DetailHintContainer } from './detail-hint-container';
import { DetailGraphWrapperDiv, PlotWrapperDiv } from './detail-graph.style';

import { renderAxes, renderAxisLabels } from '../graphs.util';
import { LineGraph, AreaGraph, MarkGraph } from '../';

const graphLeftOffset = 55;
const graphRightOffset = 20;

const clickStream$ = new Subject();
const stop$ = new Subject();

class DetailGraphComponent extends Component {
  static defaultProps = {
    verticalGridLines: [],
    showGridLines: false,
  };

  state = {
    height: 0,
    hint: null,
    selectedLineIndex: null,
  };

  componentDidMount() {
    clickStream$
      .bufferWhen(() => clickStream$.debounceTime(250))
      .takeUntil(stop$)
      .subscribe(values => {
        if (values.length === 1) {
          this.setState({ selectedLineIndex: values[0].lineIndex });
        } else {
          const {
            changeLogbookType,
            history,
            logbookName,
            navigateToLogbook,
          } = this.props;

          navigateToLogbook(
            history,
            values[0].date,
            changeLogbookType,
            logbookName,
          );
        }
      });
  }

  componentWillUnmount() {
    stop$.next();
    stop$.complete();
  }

  render() {
    const {
      axes,
      axisLabels,
      flexibleHeight,
      graphData: {
        area,
        bars,
        lines,
        marks,
        meanLine,
        meanMarks,
        threshold,
        highlightingLines,
        highlightingMarks,
      },
      height = 0,
      numericalGraphStartTime,
      timeBlocks: { mealTimes, mealBlocks },
      graphType,
      linesClickable,
      verticalGridLines,
      showGridLines,
    } = this.props;
    const { selectedLineIndex } = this.state;
    const xDomainEnd = graphType === 'day' ? 24 : 7;
    return (
      <DetailGraphWrapperDiv
        onClick={() => this.setState({ selectedLineIndex: null })}
      >
        {mealTimes && (
          <MealTimes
            graphRightOffset={graphRightOffset}
            graphLeftOffset={graphLeftOffset}
            mealTimes={mealTimes}
            mealBlocks={mealBlocks}
          />
        )}
        <PlotWrapperDiv>
          <FlexibleWidthXYPlot
            height={flexibleHeight ? height : COLLAPSED_DETAIL_GRAPH_HEIGHT}
            margin={{ right: graphRightOffset, top: 10, left: graphLeftOffset }}
            xDomain={[
              numericalGraphStartTime,
              xDomainEnd + numericalGraphStartTime,
            ]}
            yDomain={[0, 400]}
          >
            {mealTimes && this.renderMealtimeVisualCues()}
            {AreaGraph(area.color)(area.data)}
            {!isEmpty(verticalGridLines) && (
              <VerticalGridLines
                style={{ strokeDasharray: '5, 2' }}
                tickValues={verticalGridLines}
              />
            )}
            {showGridLines && (
              <HorizontalGridLines style={{ strokeDasharray: '5, 2' }} />
            )}
            {/* HypoglycemiaThreshold Line */}
            {LineGraph({
              color: threshold.color,
              strokeWidth: threshold.strokeWidth,
            })(threshold.data)}
            {LineGraph({
              color: lines.color,
              opacity: selectedLineIndex !== null ? 0.1 : lines.opacity,
              strokeWidth: lines.strokeWidth,
            })(lines.data)}
            {/* Invisible, thicker clickable lines */}
            {linesClickable &&
              LineGraph({
                color: lines.color,
                opacity: 0,
                strokeWidth: 10,
                onLineClick: this.mouseClickHandler,
              })(highlightingLines)}
            {meanLine
              ? LineGraph({
                  color: meanLine.color,
                  strokeWidth: meanLine.strokeWidth,
                  opacity: selectedLineIndex !== null ? 0.2 : 1,
                })(meanLine.data)
              : null}
            {MarkGraph(marks.data)(
              this.mouseEnterHandler,
              this.mouseLeaveHandler,
              linesClickable ? this.mouseClickHandler : null,
              selectedLineIndex !== null ? 0.2 : 1,
              selectedLineIndex !== null ? colors.charcoal : null,
            )}
            {selectedLineIndex !== null &&
              LineGraph({
                color: colors.turqoise,
                opacity: 1,
                strokeWidth: 5,
                onLineClick: this.mouseClickHandler,
              })([highlightingLines[selectedLineIndex]])}
            {selectedLineIndex !== null &&
              highlightingMarks[selectedLineIndex] &&
              MarkGraph([highlightingMarks[selectedLineIndex]])(
                this.mouseEnterHandler,
                this.mouseLeaveHandler,
                linesClickable ? this.mouseClickHandler : null,
                1,
                colors.turqoise,
              )}
            {meanMarks
              ? MarkGraph(meanMarks.data)(
                  this.mouseEnterHandler.bind(this),
                  this.mouseLeaveHandler.bind(this),
                  null,
                  selectedLineIndex !== null ? 0.2 : 1,
                )
              : null}
            {bars &&
              LineGraph({
                stroke: bars.color,
                strokeStyle: 'dashed',
                strokeWidth: 4,
              })(bars.data)}
            <Borders style={{ all: { fill: colors.white } }} />
            {this.state.hint}
            {this.renderGraphMaskLeft()}
            {renderAxes(axes, flexibleHeight)}
            {renderAxisLabels(axisLabels, height)}
            {this.props.children}
          </FlexibleWidthXYPlot>
        </PlotWrapperDiv>
      </DetailGraphWrapperDiv>
    );
  }

  renderMealtimeVisualCues() {
    return this.props.mealTimeVisualCuePointValues.map(
      (mealTimeVisualCuePointValue, index) =>
        AreaGraph(mealTimeVisualCuePointValue.color)(
          mealTimeVisualCuePointValue.data,
        ),
    );
  }

  renderGraphMaskLeft() {
    return AreaGraph(colors.white)([
      [{ x: graphLeftOffset * -1, y: 410, y0: -10 }, { x: 0, y: 410, y0: -10 }],
    ]);
  }

  mouseEnterHandler = (value: Mark) => {
    const {
      x,
      y,
      glucoseValue,
      date,
      beforeMeal,
      afterMeal,
      unit,
      aboveTargetRange,
      belowTargetRange,
    } = value;

    const topBarColor = aboveTargetRange
      ? colors.blue
      : belowTargetRange
        ? colors.red
        : null;

    const icon = beforeMeal ? (
      <AppleIcon height="17" />
    ) : afterMeal ? (
      <AppleEatenIcon height="17" />
    ) : null;

    const hint = (
      <Hint value={{ x, y }}>
        <DetailHintContainer
          icon={icon}
          topBarColor={topBarColor}
          date={date}
          glucoseValue={glucoseValue}
          unit={unit}
        />
      </Hint>
    );

    this.setState({ hint });
  };

  mouseLeaveHandler = () => {
    this.setState({ hint: null });
  };

  mouseClickHandler = (value: Mark) => clickStream$.next(value);
}

export const DetailGraph = withRouter(DetailGraphComponent);

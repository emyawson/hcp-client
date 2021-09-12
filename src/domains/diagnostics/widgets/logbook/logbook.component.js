import React, { Component, Fragment } from 'react';
import { compose, isNil, isEmpty } from 'ramda';

import {
  GraphDetail,
  ResizeWrapper,
  Table,
  ToolTip,
} from 'src/domains/diagnostics/components';
import { RenderIf, withGraphLoader } from 'src/domains/diagnostics/utils';
import { spacing } from 'src/domains/diagnostics/styles';
import {
  LogbookTable,
  MealTimesTableHeader,
} from 'src/domains/diagnostics/components/table';
import { HeaderCard } from 'src/domains/diagnostics/components/graph';
import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { LogbookHint } from './logbook-hint';
import {
  LogbookGraphWrapper,
  LogbookWrapper,
  LogbookGraphWrapperDiv,
} from './logbook.style';
import {
  getSelectedRowId,
  getCombinedMealTimeName,
  getCombinedMealTimeDate,
  getMealTimeModalMeasurements,
  toMealTimeModalDate,
} from './logbook.util';

import {
  GraphDetailContainer,
  GraphWrapperDiv,
} from '../../scenes/graphs/graph.style';
import {
  COLLAPSED_STD_GRAPH_HEIGHT,
  COLLAPSED_STD_GRAPH_HEIGHT_IN_REM,
  MIN_EXPANDED_STD_GRAPH_HEIGHT,
  LOGBOOK_LOGBOOK_MIN_WIDTH,
} from '../../scenes/graphs/graph.constants';

const LogbookGraphWrapperDivWithLoader = withGraphLoader(
  LogbookGraphWrapperDiv,
  translate('graphs.logbook.loading'),
);

export class Logbook extends Component {
  constructor() {
    super();
    this.header = { clientHeight: 0 };
  }

  state = {
    hint: null,
  };

  render() {
    const {
      logbookData,
      collapsed,
      match,
      showDetails = true,
      toolTip,
      isLoading,
    } = this.props;

    const TABLE_WRAPPER_MARGIN = 16;

    return (
      <React.Fragment>
        <RenderIf validate={!collapsed}>
          <HeaderCard
            title={translate('graphs.logbookTitle')}
            noPaddingTop
            noMarginTop
          />
        </RenderIf>
        <LogbookWrapper
          blueBackground={!isEmpty(logbookData) && !isLoading}
          onClick={this.onLogbookTableClickHandler}
        >
          <LogbookGraphWrapperDivWithLoader
            collapsed={collapsed}
            hasError={isEmpty(logbookData) && !isLoading}
            isLoading={isLoading}
          >
            <GraphWrapperDiv
              p={0}
              minHeight={collapsed ? COLLAPSED_STD_GRAPH_HEIGHT_IN_REM : 0}
              collapsed={collapsed}
              minWidth={LOGBOOK_LOGBOOK_MIN_WIDTH}
            >
              <RenderIf validate={!!logbookData.length}>
                <ResizeWrapper
                  minHeight={collapsed ? COLLAPSED_STD_GRAPH_HEIGHT : 0}
                  render={height => (
                    <Fragment>
                      <RenderIf validate={!!logbookData.length}>
                        <Table
                          m={`0 0 ${spacing.one}`}
                          innerRef={ref =>
                            ref && ref.clientHeight
                              ? (this.header.clientHeight =
                                  ref.clientHeight + TABLE_WRAPPER_MARGIN)
                              : (this.header.clientHeight = 0)
                          }
                        >
                          <MealTimesTableHeader />
                        </Table>
                      </RenderIf>
                      <LogbookGraphWrapper
                        tableHeight={
                          collapsed
                            ? COLLAPSED_STD_GRAPH_HEIGHT -
                              this.header.clientHeight
                            : height - this.header.clientHeight
                        }
                      >
                        <LogbookTable
                          match={match}
                          logbookData={
                            collapsed && logbookData.length > 2
                              ? logbookData.slice(
                                  logbookData.length - 2,
                                  logbookData.length,
                                )
                              : logbookData
                          }
                          selectedRowId={
                            match.params.selectedDate &&
                            getSelectedRowId(match, logbookData)
                          }
                          onScrollHandler={this.onTableScroll}
                          mouseClickHandler={this.onMealBlockMouseClickHandler}
                        />
                      </LogbookGraphWrapper>
                    </Fragment>
                  )}
                  resizeFunction={clientHeight => {
                    const tableHeight = clientHeight;
                    return tableHeight > MIN_EXPANDED_STD_GRAPH_HEIGHT
                      ? tableHeight
                      : MIN_EXPANDED_STD_GRAPH_HEIGHT;
                  }}
                />
              </RenderIf>
            </GraphWrapperDiv>
          </LogbookGraphWrapperDivWithLoader>
          <RenderIf
            validate={showDetails && !isEmpty(logbookData) && !isLoading}
          >
            <GraphDetailContainer mt={0}>
              <GraphDetail graphType="logbook" />
            </GraphDetailContainer>
          </RenderIf>
        </LogbookWrapper>
        <RenderIf validate={toolTip.x && toolTip.y}>
          {this.renderToolTip(toolTip)}
        </RenderIf>
      </React.Fragment>
    );
  }

  renderToolTip = toolTip => {
    const {
      x,
      y,
      data: { mealTimeData, mealTime },
    } = toolTip;

    if (isNil(x) || isNil(y)) return;

    const measurements = getMealTimeModalMeasurements(mealTimeData);

    const hintProps = {
      mealTimeName: getCombinedMealTimeName(mealTime),
      date: compose(
        toMealTimeModalDate,
        getCombinedMealTimeDate,
      )(mealTimeData),
      measurements,
    };

    return (
      <ToolTip x={x} y={y}>
        <LogbookHint {...hintProps} />
      </ToolTip>
    );
  };

  onMealBlockMouseClickHandler = (event: MouseEvent, info, width) => {
    const { toolTip, showToolTip, hideToolTip } = this.props;
    const { mealTimeData } = info;
    const { x, y } = toolTip;

    if ((isNil(x) || isNil(y)) && mealTimeData.measurements.length > 0) {
      showToolTip(event, info, width);
    } else {
      hideToolTip();
    }
  };

  onTableScroll = e => this.props.hideToolTip();

  onLogbookTableClickHandler = event => {
    const { toolTip, hideToolTip } = this.props;
    if (!isNil(toolTip.x) && !isNil(toolTip.y)) hideToolTip();
  };
}

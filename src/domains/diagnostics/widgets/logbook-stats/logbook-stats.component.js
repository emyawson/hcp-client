import React from 'react';
import { isEmpty } from 'ramda';

import { GraphDetail, ResizeWrapper } from 'src/domains/diagnostics/components';
import { HeaderCard } from 'src/domains/diagnostics/components/graph';
import {
  MIN_EXPANDED_STD_GRAPH_HEIGHT,
  LOGBOOK_LOGBOOK_MIN_WIDTH,
} from 'src/domains/diagnostics/scenes/graphs/graph.constants';
import {
  GraphDetailContainer,
  GraphWrapperDiv,
} from 'src/domains/diagnostics/scenes/graphs/graph.style';
import { withGraphLoader } from 'src/domains/diagnostics/utils';
import { RenderIf } from 'src/domains/diagnostics/utils';
import {
  LogbookGraphWrapper,
  LogbookGraphWrapperDiv,
  LogbookWrapper,
} from 'src/domains/diagnostics/widgets/logbook/logbook.style';
import { translate } from 'src/i18n'; // TODO: move to diagnostics

import { BloodGlucoseCellWrapper } from './blood-glucose-cell-wrapper.style';
import { StripedColumn } from './column.style';
import { Cell } from './cell.style';
import { DayCellWrapper } from './day-cell-wrapper.style';
import { DayColumn } from './day-column.style';
import { LogbookStatsTableHeader } from './logbook-stats-table-header.component';
import { ResponsiveVirtualizedList } from './responsive-virtualized-list.component';
import { Row } from './row.style';

import { getSelectedRowId } from '../logbook/logbook.util';

const LogbookGraphWrapperDivWithLoader = withGraphLoader(
  LogbookGraphWrapperDiv,
  translate('graphs.logbook.loading'),
);

export const LogbookStats = ({ logbookStatsData, match, isLoading }) => {
  const selectedRowId = getSelectedRowId(match, logbookStatsData);

  const rowRenderer = index => {
    const {
      columns: [
        day,
        numberOfTests,
        meanBloodGlucose,
        standardDeviation,
        hypos,
        carbohydrates,
        insulin,
        basal,
        bolus,
        numberOfBoluses,
        basalBolusPercentage,
      ],
    } = logbookStatsData[index];

    return (
      <Row>
        <DayColumn highlight={selectedRowId === index}>
          <DayCellWrapper label={day.label}>
            <Cell textAlign="left">
              <div>{day.value[0]}</div>
              <div>{day.value[1]}</div>
            </Cell>
          </DayCellWrapper>
        </DayColumn>
        <StripedColumn>
          <Cell>{numberOfTests}</Cell>
        </StripedColumn>
        <StripedColumn>
          <BloodGlucoseCellWrapper label={meanBloodGlucose.label}>
            <Cell>{meanBloodGlucose.value}</Cell>
          </BloodGlucoseCellWrapper>
        </StripedColumn>
        <StripedColumn>
          <Cell>{standardDeviation}</Cell>
        </StripedColumn>
        <StripedColumn>
          <Cell>{hypos}</Cell>
        </StripedColumn>
        <StripedColumn flex={2} pl={3} pr={3}>
          <Cell>{carbohydrates}</Cell>
        </StripedColumn>
        <StripedColumn>
          <Cell>{insulin}</Cell>
        </StripedColumn>
        <StripedColumn>
          <Cell>{basal}</Cell>
        </StripedColumn>
        <StripedColumn>
          <Cell>{bolus}</Cell>
        </StripedColumn>
        <StripedColumn>
          <Cell>{numberOfBoluses}</Cell>
        </StripedColumn>
        <StripedColumn>
          <Cell>{basalBolusPercentage}</Cell>
        </StripedColumn>
      </Row>
    );
  };

  return (
    <React.Fragment>
      <HeaderCard
        title={translate('graphs.logbookStatsTitle')}
        noPaddingTop
        noMarginTop
      />
      <LogbookWrapper blueBackground={!isEmpty(logbookStatsData) && !isLoading}>
        <LogbookGraphWrapperDivWithLoader
          hasError={isEmpty(logbookStatsData) && !isLoading}
          isLoading={isLoading}
        >
          <LogbookStatsTableHeader minWidth={LOGBOOK_LOGBOOK_MIN_WIDTH} />
          <GraphWrapperDiv minWidth={LOGBOOK_LOGBOOK_MIN_WIDTH}>
            <ResizeWrapper
              minHeight={MIN_EXPANDED_STD_GRAPH_HEIGHT}
              render={height => (
                <LogbookGraphWrapper tableHeight={height}>
                  <ResponsiveVirtualizedList
                    length={logbookStatsData.length}
                    rowHeight={68}
                    rowRenderer={rowRenderer}
                    rowNumberToScrollTo={selectedRowId}
                  />
                </LogbookGraphWrapper>
              )}
              resizeFunction={clientHeight => clientHeight}
            />
          </GraphWrapperDiv>
        </LogbookGraphWrapperDivWithLoader>
        <RenderIf validate={!isEmpty(logbookStatsData) && !isLoading}>
          <GraphDetailContainer>
            <GraphDetail graphType="logbook-stats" />
          </GraphDetailContainer>
        </RenderIf>
      </LogbookWrapper>
    </React.Fragment>
  );
};

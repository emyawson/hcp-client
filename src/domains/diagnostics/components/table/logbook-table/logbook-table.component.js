import React from 'react';
import { AutoSizer, List } from 'react-virtualized';

import { translateDate } from 'src/utils';

import { formatDateAsRowHeaderList } from './logbook-table.util';

import { LogbookDayCell, LogbookDetailsCell, LogbookMealTimesRow } from '..';

import { LogbookRowCard } from '../logbook-row-card';
import {
  LOGBOOK_ROW_HEIGHT,
  LOGBOOK_ROW_PADDING,
} from '../../../constants/logbook.constants';

export const LogbookTable = ({
  height: tableHeight,
  logbookData,
  match,
  selectedRowId,
  mouseClickHandler,
  onScrollHandler,
}) => {
  const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const { day, mealTimes, numberOfRows } = logbookData[index];
    if (Object.keys(mealTimes).length === 0) {
      return null;
    }
    return (
      <LogbookRowCard keyText={key} style={style}>
        <LogbookDayCell
          dayLines={formatDateAsRowHeaderList(translateDate(day))}
          numberOfRows={numberOfRows}
          highlight={selectedRowId === index}
        />
        <LogbookMealTimesRow
          day={day}
          mealTimes={mealTimes}
          numberOfRows={numberOfRows}
          mouseClickHandler={mouseClickHandler}
        />
        <LogbookDetailsCell numberOfRows={numberOfRows} />
      </LogbookRowCard>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          overscanRowCount={1}
          rowCount={logbookData.length}
          rowHeight={({ index }) =>
            logbookData[index].numberOfRows * LOGBOOK_ROW_HEIGHT +
            LOGBOOK_ROW_PADDING
          }
          rowRenderer={rowRenderer}
          scrollToIndex={selectedRowId}
          width={width}
          onScroll={onScrollHandler}
        />
      )}
    </AutoSizer>
  );
};

import React from 'react';

import { convertJSDateGMT } from 'src/domains/diagnostics/utils';
import { isWeekendDay } from 'src/domains/diagnostics/utils/time.util';

import { DayLinesList } from './logbook-day-cell.style';

import {
  EmptyRows,
  LogbookCellBlock,
  LogbookCellBlocksContainer,
  LogbookTableCellDiv,
} from '..';

export const LogbookDayCell = ({ dayLines, numberOfRows, highlight }) => (
  <LogbookTableCellDiv
    key={`${dayLines.join(', ')}`}
    width="6.7rem"
    borderRight={true}
    highlight={highlight}
  >
    <LogbookCellBlocksContainer>
      <LogbookCellBlock align="left" flex={1}>
        <DayLinesList
          isWeekendDay={isWeekendDay(
            convertJSDateGMT(new Date(dayLines.join(' '))),
          )}
        >
          {dayLines.map(dayLine => <li key={dayLine}>{dayLine}</li>)}
        </DayLinesList>
      </LogbookCellBlock>
    </LogbookCellBlocksContainer>
    <EmptyRows
      numberOfRows={numberOfRows - (dayLines.length - 1)}
      numberOfCells={1}
    />
  </LogbookTableCellDiv>
);

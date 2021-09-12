import React from 'react';

import { EmptyCells, LogbookCellBlocksContainer } from '..';

export const EmptyRows = ({
  alternateFill,
  day,
  numberOfRows,
  numberOfCells,
  showBorder,
}) =>
  Array.from({ length: numberOfRows }).map((emptyValue, emptyRowsIndex) => (
    <LogbookCellBlocksContainer
      key={`${day} - empty row - ${emptyRowsIndex}`}
      borderBottom={showBorder && emptyRowsIndex < numberOfRows - 1}
      rowNumber={emptyRowsIndex}
    >
      <EmptyCells
        alternateFill={alternateFill}
        numberOfCells={numberOfCells}
        showBorder={showBorder}
      />
    </LogbookCellBlocksContainer>
  ));

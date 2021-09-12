import React from 'react';

import { EmptyRows, LogbookTableCellDiv } from '..';

export const LogbookDetailsCell = ({ numberOfRows }) => (
  <LogbookTableCellDiv flex={1} width="100%">
    <EmptyRows numberOfRows={numberOfRows} numberOfCells={1} showBorder />
  </LogbookTableCellDiv>
);

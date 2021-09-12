import React from 'react';

import { LogbookCellBlock } from '..';

import {
  NUMBER_OF_BEDTIME_NIGHT_SECTION_CELLS,
  NUMBER_OF_BEFORE_MEALTIME_CELLS,
} from '../../../constants/logbook.constants';

export const EmptyCells = ({
  alternateFill,
  day,
  numberOfCells,
  rowNumber,
  showBorder,
}) =>
  Array.from({ length: numberOfCells }).map((emptyValue, emptyCellsIndex) => (
    <LogbookCellBlock
      key={`${day} - empty row ${rowNumber} - cell ${emptyCellsIndex}`}
      flex={1}
      alternateFill={
        alternateFill ||
        (numberOfCells > NUMBER_OF_BEDTIME_NIGHT_SECTION_CELLS &&
          emptyCellsIndex > NUMBER_OF_BEFORE_MEALTIME_CELLS - 1)
      }
      borderRight={
        numberOfCells > NUMBER_OF_BEDTIME_NIGHT_SECTION_CELLS &&
        emptyCellsIndex === NUMBER_OF_BEFORE_MEALTIME_CELLS - 1 &&
        showBorder
      }
    >
      &nbsp;
    </LogbookCellBlock>
  ));

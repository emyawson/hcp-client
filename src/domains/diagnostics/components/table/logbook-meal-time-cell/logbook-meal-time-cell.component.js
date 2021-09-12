import React from 'react';

import {
  EmptyRows,
  LogbookCellBlock,
  LogbookCellBlockContents,
  LogbookCellBlocksContainer,
  LogbookTableCellDiv,
} from '..';

// TO DO: refactor so that component isn't importing from widget
import { getUnitsFromBeforeAndAfterMealTimeMeasurements } from 'src/domains/diagnostics/widgets/logbook/logbook.util';

import {
  LOGBOOK_UNITS,
  NUMBER_OF_BEDTIME_NIGHT_SECTION_CELLS,
  NUMBER_OF_BEFORE_MEALTIME_CELLS,
  NUMBER_OF_BEFORE_AND_AFTER_MEALTIME_SECTION_CELLS,
} from '../../../constants/logbook.constants';

const placeHolder = <span>&nbsp;</span>;

export const LogbookMealTimeCell = ({
  alternateFill,
  day,
  hasBeforeAndAfterIntervals,
  mealTimeMatrix,
  numberOfRowsWithContent,
  numberOfTotalRows,
  width,
  mouseClickHandler,
}) => (
  <LogbookTableCellDiv
    borderRight={true}
    width={width}
    mouseClickHandler={mouseClickHandler}
    pointerCursor={numberOfRowsWithContent > 0}
  >
    {mealTimeMatrix.map((row, index) => {
      let targetRanges = { before: {}, after: {} };
      let units;
      if (hasBeforeAndAfterIntervals) {
        const { before, after } = row;

        targetRanges.before = {
          aboveTargetRange: before.aboveTargetRange,
          belowTargetRange: before.belowTargetRange,
          hypoSymptoms: before.hypoSymptoms,
        };
        targetRanges.after = {
          aboveTargetRange: after.aboveTargetRange,
          belowTargetRange: after.belowTargetRange,
          hypoSymptoms: after.hypoSymptoms,
        };

        units = getUnitsFromBeforeAndAfterMealTimeMeasurements(row);
      } else {
        const { glucose, carbohydrates, bolus } = row;
        targetRanges.before = {
          aboveTargetRange: row.aboveTargetRange,
          belowTargetRange: row.belowTargetRange,
          hypoSymptoms: row.hypoSymptoms,
        };
        units = [
          { value: glucose, type: LOGBOOK_UNITS.GLUCOSE },
          { value: carbohydrates, type: LOGBOOK_UNITS.CARBOHYDRATES },
          { value: bolus, type: LOGBOOK_UNITS.BOLUS },
        ];
      }
      return (
        <LogbookCellBlocksContainer
          key={`day row mealtime row - ${day} - ${index}`}
          borderBottom={index < numberOfTotalRows - 1}
        >
          {units.map((unit, index, unitsArray) => {
            const { type, value } = unit;

            return (
              <LogbookCellBlock
                key={`day row mealtime cell - ${day} - unit - ${index}`}
                alternateFill={
                  alternateFill || index > NUMBER_OF_BEFORE_MEALTIME_CELLS - 1
                }
                borderRight={
                  index < unitsArray.length - 1 && type === LOGBOOK_UNITS.BOLUS
                }
                flex={1}
              >
                <LogbookCellBlockContents
                  unit={type}
                  aboveTargetRange={
                    index < NUMBER_OF_BEFORE_MEALTIME_CELLS - 1
                      ? targetRanges.before.aboveTargetRange
                      : targetRanges.after.aboveTargetRange
                  }
                  belowTargetRange={
                    index < NUMBER_OF_BEFORE_MEALTIME_CELLS - 1
                      ? targetRanges.before.belowTargetRange
                      : targetRanges.after.belowTargetRange
                  }
                  hypoSymptoms={
                    index < NUMBER_OF_BEFORE_MEALTIME_CELLS - 1
                      ? targetRanges.before.hypoSymptoms
                      : targetRanges.after.hypoSymptoms
                  }
                  value={value}
                >
                  {value ? value : placeHolder}
                </LogbookCellBlockContents>
              </LogbookCellBlock>
            );
          })}
        </LogbookCellBlocksContainer>
      );
    })}
    <EmptyRows
      alternateFill={alternateFill}
      day={day}
      numberOfRows={numberOfTotalRows - numberOfRowsWithContent}
      numberOfCells={
        hasBeforeAndAfterIntervals
          ? NUMBER_OF_BEFORE_AND_AFTER_MEALTIME_SECTION_CELLS
          : NUMBER_OF_BEDTIME_NIGHT_SECTION_CELLS
      }
      showBorder
    />
  </LogbookTableCellDiv>
);

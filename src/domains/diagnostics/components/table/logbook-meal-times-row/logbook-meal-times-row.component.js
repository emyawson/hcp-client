import React from 'react';

import { LogbookMealTimeCell } from '..';

import {
  MEAL_TIMES,
  LOGBOOK_MODAL_WIDTH,
} from '../../../constants/logbook.constants';

export const LogbookMealTimesRow = ({
  day,
  mealTimes,
  numberOfRows,
  mouseClickHandler,
}) =>
  Object.keys(mealTimes).map((mealTime, index) => {
    const {
      hasBeforeAndAfterIntervals,
      measurements,
      numberOfRowsWithContent,
    } = mealTimes[mealTime];

    const cellMouseClickHandler = mouseEvent => {
      const data = {
        mealTimeData: mealTimes[mealTime],
        mealTime,
      };
      mouseClickHandler(mouseEvent, data, LOGBOOK_MODAL_WIDTH);
    };

    return (
      <LogbookMealTimeCell
        alternateFill={index === 0}
        key={`day row - ${day} - ${mealTime}`}
        day={day}
        hasBeforeAndAfterIntervals={hasBeforeAndAfterIntervals}
        mealTimeMatrix={measurements}
        numberOfRowsWithContent={numberOfRowsWithContent}
        numberOfTotalRows={numberOfRows}
        width={
          mealTime === MEAL_TIMES.NIGHT || mealTime === MEAL_TIMES.BEDTIME
            ? '9rem'
            : '15rem'
        }
        mouseClickHandler={cellMouseClickHandler}
      />
    );
  });

import React from 'react';

import { LogbookTableCell, MealTimeBeforeAfterIcons, MealTimeIcon } from '..';

import { MEAL_TIMES } from '../../../constants/logbook.constants';

export const MealTimeIconsCell = ({ keyText, mealTime, alignItems }) => (
  <LogbookTableCell key={`${mealTime}-${keyText}`} p={1}>
    {mealTime === MEAL_TIMES.NIGHT || mealTime === MEAL_TIMES.BEDTIME ? (
      <MealTimeIcon
        keyText={keyText}
        mealTime={mealTime}
        alignItems={alignItems}
      />
    ) : (
      <MealTimeBeforeAfterIcons
        keyText={keyText}
        mealTime={mealTime}
        alignItems={alignItems}
      />
    )}
  </LogbookTableCell>
);

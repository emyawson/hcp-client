import React from 'react';

import { TableHeader } from 'src/domains/diagnostics/components';
import { colors } from 'src/domains/diagnostics/styles';

import {
  LogbookTableCell,
  LogbookTableRow,
  MealTimeIconsCell,
  MealTimeLabelCell,
  LogbookUnitsHeader,
} from '..';

const mealTimes = ['NIGHT', 'BREAKFAST', 'LUNCH', 'DINNER', 'BEDTIME'];

export const MealTimesTableHeader = ({ children }) => (
  <TableHeader bg={colors.blueMarineAlpha5}>
    <LogbookTableRow flex={1}>
      <MealTimeLabelCell
        key={'meal time label header - DATE-0'}
        keyText={0}
        mealTime={'DATE'}
        alignItems="left"
      />

      {mealTimes.map((m, i) => (
        <MealTimeLabelCell
          key={`meal time label header - ${m}-${i + 1}`}
          keyText={`${i + 1}`}
          mealTime={m}
          alignItems="left"
          width={'9rem'}
        />
      ))}
      <MealTimeLabelCell
        key={'meal time label header - DATE-6'}
        keyText={6}
        mealTime={'NOTES'}
        alignItems="left"
      />
    </LogbookTableRow>
    <LogbookTableRow flex={1}>
      <LogbookTableCell />
      {mealTimes.map((m, i) => (
        <MealTimeIconsCell
          key={`meal time icon header - ${m}-${i}`}
          keyText={`${i}`}
          mealTime={m}
          alignItems="left"
        />
      ))}
      <LogbookTableCell p={1} />
    </LogbookTableRow>
    <LogbookTableRow flex={1}>
      <LogbookTableCell width="6.7rem" />
      <LogbookUnitsHeader />
    </LogbookTableRow>
  </TableHeader>
);

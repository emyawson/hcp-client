import React from 'react';

import { colors, spacing } from 'src/domains/diagnostics/styles';
import {
  MealTime,
  MealTitleWithTooltip,
} from 'src/domains/diagnostics/components';

import { LogbookCellBlock, LogbookTableCell } from '..';

export const MealTimeLabelCell = ({ keyText, mealTime, alignItems, width }) => (
  <LogbookTableCell key={`${mealTime}-${keyText}`} p={1} width={width}>
    <LogbookCellBlock
      color={colors.blueMarine}
      p={spacing.one}
      height={'1.5rem'}
    >
      <MealTime key={keyText} bold>
        <MealTitleWithTooltip textAlign={alignItems}>
          {mealTime}
        </MealTitleWithTooltip>
      </MealTime>
    </LogbookCellBlock>
  </LogbookTableCell>
);

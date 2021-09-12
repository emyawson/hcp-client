import React from 'react';

import { getMealIcon, MealTime } from 'src/domains/diagnostics/components';
import { colors } from 'src/domains/diagnostics/styles';

import { LogbookCellBlock, LogbookCellBlocksContainer } from '..';

const borderBottom = {
  color: colors.blueMarine,
};

const iconStyles = {
  withBorder: true,
  height: 28,
  iconColor: colors.white,
  borderFillColor: colors.blueMarine,
  borderColor: 'none',
};

export const MealTimeBeforeAfterIcons = ({ keyText, mealTime, alignItems }) => (
  <LogbookCellBlocksContainer borderBottom={borderBottom} m={'0 0.375rem'}>
    <LogbookCellBlock flex={3}>
      <MealTime key={`${keyText}-before`} alignItems={alignItems} p={0}>
        {getMealIcon(`BEFORE_${mealTime}`, iconStyles)}
      </MealTime>
    </LogbookCellBlock>
    <LogbookCellBlock flex={2}>
      <MealTime key={`${keyText}-after`} alignItems={alignItems} p={0}>
        {getMealIcon(`AFTER_${mealTime}`, iconStyles)}
      </MealTime>
    </LogbookCellBlock>
  </LogbookCellBlocksContainer>
);

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

export const MealTimeIcon = ({ keyText, mealTime, alignItems }) => (
  <LogbookCellBlocksContainer borderBottom={borderBottom} m={'0 0.375rem'}>
    <LogbookCellBlock flex={1}>
      <MealTime key={keyText} alignItems={alignItems} p={0}>
        {getMealIcon(mealTime, iconStyles)}
      </MealTime>
    </LogbookCellBlock>
  </LogbookCellBlocksContainer>
);

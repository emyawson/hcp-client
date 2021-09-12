import React from 'react';

import { MealTitleWithTooltip } from './meal-title.component';
import { Container, MealTimesContainer, MealTime } from './meal-times.style';
import { getMealIcon } from './meal-times.util';

export const MealTimes = ({
  graphLeftOffset,
  graphRightOffset,
  mealTimes,
  mealBlocks,
}) => (
  <Container marginLeft={graphLeftOffset} marginRight={graphRightOffset}>
    <MealTimesContainer>
      {mealBlocks.map((m, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <MealTime key={i} width={m.width} showBorder>
          <MealTitleWithTooltip>{m.description}</MealTitleWithTooltip>
        </MealTime>
      ))}
    </MealTimesContainer>
    <MealTimesContainer>
      {mealTimes.map((m, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <MealTime key={i} width={m.width} showBorder>
          {getMealIcon(m.description)}
        </MealTime>
      ))}
    </MealTimesContainer>
  </Container>
);

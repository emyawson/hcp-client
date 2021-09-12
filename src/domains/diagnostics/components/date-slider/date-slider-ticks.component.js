import React from 'react';

import { TickWrapper, Tick } from './date-slider.style';
import { getMonthsWithinRange } from './date-slider.util';

export const DateSliderTicks = ({
  rangeStart,
  rangeEnd,
  firstMeasurementDate,
  tickDistance,
}) => (
  <TickWrapper>
    {getMonthsWithinRange(rangeStart, rangeEnd, firstMeasurementDate).map(
      month => (
        <Tick key={month.stringValue} left={month.daysFromStart * tickDistance}>
          {month.stringValue}
        </Tick>
      ),
    )}
  </TickWrapper>
);

import React from 'react';

import { IntervalsDisplayContainer } from './intervals-header.style';

import { IntervalLabel } from '../interval-label';

export const IntervalsHeader = ({ intervals = [] }) => (
  <IntervalsDisplayContainer>
    {intervals.map(({ label, info }, index) => (
      <IntervalLabel
        key={`interval label ${index} - ${label}`}
        label={label}
        info={info}
      />
    ))}
  </IntervalsDisplayContainer>
);

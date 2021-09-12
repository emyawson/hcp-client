import React from 'react';

import { IndicatorLabelSpan } from './indicator-label.style';

export const IndicatorLabel = ({
  active = false,
  error = false,
  text,
  marginDirection = '',
}) => (
  <IndicatorLabelSpan active={active} error={error} margin={marginDirection}>
    {text}
  </IndicatorLabelSpan>
);

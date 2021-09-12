import React from 'react';

import { LocalizedText } from 'src/components/localized-text';

import {
  FlexWrapDiv,
  IntervalValueInput,
  IntervalValueLabel,
} from '../alerts.style';

export const AlertsThreshold = ({
  valueModelPath,
  textKey,
  value,
  intervalModelPath,
}) => (
  <FlexWrapDiv>
    <IntervalValueLabel>
      <LocalizedText textKey={textKey} />
    </IntervalValueLabel>
    <IntervalValueInput
      model={`${intervalModelPath}${valueModelPath}`}
      value={value}
      readOnly
    />
  </FlexWrapDiv>
);

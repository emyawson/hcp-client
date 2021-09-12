import React from 'react';

import { GridItem } from 'src/components';

import { AlertsThreshold, AlertsCounter } from '../../alerts';
import { AlertsIntervalGrid } from '../alerts.style';

export const AlertsThresholdRow = ({
  intervalModelPath,
  label,
  alertId,
  counterLabel,
  onUpdateThresholdLimit,
  initialCounterValue,
  disabled = false,
  values: { preIdealInterval, postIdealInterval, noctIdealInterval },
}) => {
  const formControlsByIntervalRowType = [
    {
      modelPath: '.preIdealInterval',
      value: preIdealInterval,
    },
    {
      modelPath: '.postIdealInterval',
      value: postIdealInterval,
    },
    {
      modelPath: '.noctIdealInterval',
      value: noctIdealInterval,
    },
  ];

  return (
    <AlertsIntervalGrid>
      {formControlsByIntervalRowType.map(({ modelPath, value }) => (
        <GridItem
          span="1"
          columns="4"
          key={`AlertsIntervalGridItem${modelPath}`}
        >
          <AlertsThreshold
            intervalModelPath={intervalModelPath}
            valueModelPath={modelPath}
            textKey={label}
            value={value}
            key={`${modelPath}${value}`}
          />
        </GridItem>
      ))}
      <GridItem span="1" columns="4">
        <AlertsCounter
          id={alertId}
          key={alertId}
          labelTextKey={counterLabel}
          activateModelPath={`.${alertId}.active`}
          thresholdModelPath={`.${alertId}.thresholdLimit`}
          onUpdateThresholdLimit={onUpdateThresholdLimit}
          initialThresholdLimit={initialCounterValue}
          disabled={disabled}
        />
      </GridItem>
    </AlertsIntervalGrid>
  );
};

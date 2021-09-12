import React from 'react';

import { ToggleSwitch, LocalizedText, NumberInput } from 'src/components';
import { ALERTS_THRESHOLD_LIMITS } from 'src/core/alerts';

import {
  AlertsCounterCheckboxWrapper,
  AlertsCounterContainer,
  AlertsCounterIncrementWrapper,
  NumberInputWithLabelWrapper,
} from './alerts-counter.style';

import { IntervalValueLabel } from '../alerts.style';

export const AlertsCounter = ({
  activateModelPath,
  id,
  labelTextKey,
  thresholdModelPath,
  disabled = false,
  onUpdateThresholdLimit,
  initialThresholdLimit,
}) => (
  <AlertsCounterContainer>
    <AlertsCounterCheckboxWrapper>
      <ToggleSwitch
        id={`EnableAlerts-${id}`}
        label={
          <IntervalValueLabel>
            <LocalizedText textKey={labelTextKey} />
          </IntervalValueLabel>
        }
        modelPath={activateModelPath}
      />
    </AlertsCounterCheckboxWrapper>
    <NumberInputWithLabelWrapper>
      <IntervalValueLabel>
        <LocalizedText textKey="alerts.activateThreshold" />
      </IntervalValueLabel>
      <AlertsCounterIncrementWrapper>
        <NumberInput
          min={ALERTS_THRESHOLD_LIMITS.LIMIT_MIN}
          max={ALERTS_THRESHOLD_LIMITS.LIMIT_MAX}
          initialValue={initialThresholdLimit}
          model={thresholdModelPath}
          updateValue={onUpdateThresholdLimit(`alerts.${id}.thresholdLimit`)}
          row
        />
      </AlertsCounterIncrementWrapper>
    </NumberInputWithLabelWrapper>
  </AlertsCounterContainer>
);

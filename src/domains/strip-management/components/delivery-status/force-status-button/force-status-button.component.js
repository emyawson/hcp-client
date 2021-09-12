import React from 'react';

import { PlusIcon } from 'src/assets/icons';
import { colors } from 'src/core/styles/colors';
import { TrafficLightCircle } from 'src/components/traffic-light-circle';
import { ControlRadio } from 'src/components/forms';

import {
  ForceIconSpan,
  RadioButtonReset,
  StatusLabel,
} from './force-status-button.style';

export const ForceIcon = ({ size }) => (
  <ForceIconSpan>
    <PlusIcon fillColor={colors.white} height={size * 0.25} />
  </ForceIconSpan>
);

export const ForceStatusButton = ({
  disabled = false,
  modelPath = '.status',
  size = 36,
  status,
}) => (
  <StatusLabel
    status={status}
    disabled={disabled}
    htmlFor={`${modelPath}-${status}`}
  >
    <TrafficLightCircle
      disabled={disabled}
      size={size}
      status={status}
      icon={<ForceIcon size={size} />}
    />
    <ControlRadio
      component={RadioButtonReset}
      id={`${modelPath}-${status}`}
      model={modelPath}
      value={status}
    />
  </StatusLabel>
);

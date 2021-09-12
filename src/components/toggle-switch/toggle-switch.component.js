import React from 'react';
import { equals, pipe, type } from 'ramda';

import { hasValue } from 'src/utils';

import {
  ToggleSwitchWrapperLabel,
  ToggleSwitchP,
  ToggleSwitchContainerSpan,
  ToggleSwitchIndicatorSpan,
  ToggleSwitchInput,
  ToggleSwitchControl,
} from './toggle-switch.style';

const renderLabel = label =>
  pipe(
    type,
    equals('string'),
  )(label) ? (
    <ToggleSwitchP>{label}</ToggleSwitchP>
  ) : (
    label
  );

export const ToggleSwitch = ({
  disabled = false,
  id,
  label,
  modelPath,
  size = 24,
}) => {
  const ControlledOrDefaultInput = hasValue(modelPath)
    ? ToggleSwitchControl
    : ToggleSwitchInput;
  return (
    <ToggleSwitchWrapperLabel htmlFor={id}>
      {renderLabel(label)}
      <ControlledOrDefaultInput
        type="checkbox"
        id={id}
        disabled={disabled}
        model={modelPath}
        onKeyPress={e => {
          e.preventDefault();
        }}
      />
      <ToggleSwitchContainerSpan size={size}>
        <ToggleSwitchIndicatorSpan size={size} />
      </ToggleSwitchContainerSpan>
    </ToggleSwitchWrapperLabel>
  );
};

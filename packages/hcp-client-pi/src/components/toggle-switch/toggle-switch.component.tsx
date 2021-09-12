import { ChangeHandler } from '@roche/patterns-indicators/components';
import { hasValue } from '@roche/patterns-indicators/utils/validation';
import { equals, pipe, type } from 'ramda';
import * as React from 'react';

import {
  ToggleSwitchContainerSpan,
  ToggleSwitchControl,
  ToggleSwitchIndicatorSpan,
  ToggleSwitchInput,
  ToggleSwitchP,
  ToggleSwitchWrapperLabel,
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

const onKeyPress = e => {
  e.preventDefault();
};

export interface ToggleSwitchProps {
  checked?: boolean;
  changeHandler?: ChangeHandler;
  disabled?: boolean;
  id: string;
  label: string | JSX.Element;
  modelPath?: string;
  size?: number;
}

export const ToggleSwitch = ({
  checked,
  disabled = false,
  id,
  label,
  modelPath,
  size = 24,
  changeHandler,
}: ToggleSwitchProps) => {
  const ControlledOrDefaultInput = hasValue(modelPath)
    ? ToggleSwitchControl
    : ToggleSwitchInput;

  return (
    <ToggleSwitchWrapperLabel htmlFor={id}>
      {renderLabel(label)}
      <ControlledOrDefaultInput
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        modelPath={modelPath ? modelPath : ''}
        onChange={changeHandler as () => void}
        onKeyPress={onKeyPress}
      />
      <ToggleSwitchContainerSpan size={size}>
        <ToggleSwitchIndicatorSpan size={size} />
      </ToggleSwitchContainerSpan>
    </ToggleSwitchWrapperLabel>
  );
};

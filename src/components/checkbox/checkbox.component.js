import React from 'react';

import { hasValue } from 'src/utils';
import { CheckmarkIcon } from 'src/assets/icons';

import {
  CheckboxCheckMark,
  CheckboxCheckMarkContainer,
  CheckboxContainer,
  CheckboxControl,
  CheckboxInput,
} from './checkbox.style';

export class Checkbox extends React.Component {
  render() {
    const {
      id = '',
      label,
      labelBeforeCheckbox = false,
      size,
      disabled = false,
      modelPath,
      ...other
    } = this.props;
    const ControlledOrDefaultInput = hasValue(modelPath)
      ? CheckboxControl
      : CheckboxInput;
    return (
      <CheckboxContainer
        htmlFor={id}
        leftPadding={labelBeforeCheckbox ? 0 : 25}
        rightPadding={!labelBeforeCheckbox ? 0 : 25}
        disabled={disabled}
      >
        <ControlledOrDefaultInput
          id={id}
          type="checkbox"
          disabled={disabled}
          model={modelPath}
          {...other}
        />
        <CheckboxCheckMarkContainer
          labelBeforeCheckbox={labelBeforeCheckbox}
          size={size}
          disabled={disabled}
        >
          <CheckboxCheckMark>
            <CheckmarkIcon height={size / 2} />
          </CheckboxCheckMark>
        </CheckboxCheckMarkContainer>
        &nbsp;{label}
      </CheckboxContainer>
    );
  }
}

import React, { Component } from 'react';
import { isEmpty } from 'ramda';

import { RenderIf } from 'src/utils';
import { PlusIcon, MinusIcon } from 'src/assets/icons';

import { NumberInputField } from './number-input-field';
import {
  NumberInputContainer,
  NumberInputOperatorWrapper,
  OperatorDivider,
  MinusIconSpan,
} from './number-input.style';
import { NumberInputOperator } from './number-input-operator';

const addButtonIcon = <PlusIcon height={10} />;
const subtractButtonIcon = (
  <MinusIconSpan>
    <MinusIcon />
  </MinusIconSpan>
);

export class NumberInput extends Component {
  constructor(props) {
    super(props);
    // The current model value of the number is stored
    // in component state so that the increment and
    // decrement functions can access the value
    const { initialValue } = this.props;
    this.state = {
      modelValue: initialValue,
    };
  }

  render() {
    const { id, model, min, max, disabled = false, row = false } = this.props;
    const numberInputField = (
      <NumberInputField
        id={id}
        model={model}
        min={min}
        max={max}
        disabled={disabled}
        updateField={this.updateField}
      />
    );
    return (
      <NumberInputContainer disabled={disabled}>
        <RenderIf validate={row}>
          <NumberInputOperator
            icon={subtractButtonIcon}
            operatorAction={this.decrement}
            position="left"
            disabled={disabled}
          />
          {numberInputField}
          <NumberInputOperator
            icon={addButtonIcon}
            operatorAction={this.increment}
            position="right"
            disabled={disabled}
          />
        </RenderIf>
        <RenderIf validate={!row}>
          {numberInputField}
          <NumberInputOperatorWrapper>
            <NumberInputOperator
              icon={addButtonIcon}
              operatorAction={this.increment}
              disabled={disabled}
            />
            <OperatorDivider />
            <NumberInputOperator
              icon={subtractButtonIcon}
              operatorAction={this.decrement}
              disabled={disabled}
            />
          </NumberInputOperatorWrapper>
        </RenderIf>
      </NumberInputContainer>
    );
  }

  // updateField: updates the RRF local form model using updateValue
  // as well as this component's state (needed for the increment/decrement).
  // Bundled together so they are always in sync.
  //
  // updateValue should be a class method belonging to the parent
  // component (where the local form is located)
  // It should call RRF's actions.change to update the local form state
  updateField = value => {
    const { updateValue } = this.props;
    const parsedValue = isEmpty(value) ? '' : parseInt(value, 10);
    this.setState({ modelValue: parsedValue });
    updateValue(parsedValue);
  };

  increment = () => {
    const { max } = this.props;
    const { modelValue } = this.state;
    const newValue = modelValue >= max ? max : modelValue + 1;
    this.updateField(newValue);
  };

  decrement = () => {
    const { min } = this.props;
    const { modelValue } = this.state;
    const newValue = modelValue <= min ? min : modelValue - 1;
    this.updateField(newValue);
  };
}

NumberInput.defaultProps = {
  max: 99,
  min: 0,
};

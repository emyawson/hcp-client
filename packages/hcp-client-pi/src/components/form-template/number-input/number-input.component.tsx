import { InputContent } from '@roche/patterns-indicators/components/form-template/form-template.style';
import * as React from 'react';

import {
  NumberValidation,
  PatternValidation,
} from '../../../types/config.types';
import { ChangeHandler, NumberInputProps } from '../form-template.types';

class NumberInput extends React.Component<
  NumberInputProps,
  { error: boolean }
> {
  constructor(props: NumberInputProps) {
    super(props);
    this.state = { error: false };
  }

  public render() {
    const { name, path, value } = this.props;
    return (
      <InputContent
        error={this.state.error}
        type="number"
        name={name}
        key={`number-input-key-${path}-${name}`}
        defaultValue={`${value}`}
        onChange={this.makeChangeHandler(path, name)}
      />
    );
  }

  public makeChangeHandler(path, fieldName) {
    return (event: React.ChangeEvent<any>) => {
      const numberInputValue = event.target.value;
      if (this.props.validationConfig[fieldName].type === 'number') {
        const validationConfig = this.props.validationConfig[
          fieldName
        ] as NumberValidation & { required: boolean };

        if (
          numberInputValue < validationConfig.min ||
          numberInputValue > validationConfig.max
        ) {
          this.setState({ error: true });
        } else {
          this.setState({ error: false });
        }
      }

      // tslint:disable-next-line:no-unused-expression
      this.props.changeHandler &&
        this.props.changeHandler(path, fieldName, Number(event.target.value));
    };
  }
}

export const NumberInputFactory = (
  onChange: ChangeHandler,
  validationConfig: PatternValidation,
) => (N: NumberInputProps) => (
  <NumberInput
    key={`number-input-${N.path}-${N.name}`}
    {...N}
    changeHandler={onChange}
    validationConfig={validationConfig}
  />
);

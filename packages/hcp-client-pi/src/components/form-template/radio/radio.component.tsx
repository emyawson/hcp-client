import * as React from 'react';

import { RadioContent } from '@roche/patterns-indicators/components/form-template/form-template.style';

import { ChangeHandler, SelectProps } from '../form-template.types';

export const RadioInput: React.StatelessComponent<SelectProps<string>> = ({
  options,
  path,
  name,
  value,
  changeHandler,
}: SelectProps<string>) => {
  const makeChangeHandler = (pathName, fieldName) => {
    return (event: React.ChangeEvent<any>) => {
      if (changeHandler) {
        changeHandler(pathName, fieldName, event.currentTarget.value);
      }
    };
  };

  return <React.Fragment>
    { options.map((option, index) => (
    <RadioContent key={`radio-key-${index}-name`}>
      <label>
        <span>{option.text}</span>
        <input
          type="radio"
          name={`${path}.${name}`}
          onChange={makeChangeHandler(path, name)}
          value={option.value}
          defaultChecked={value === option.value}
        />
        <span className="checkmark" />
      </label>
    </RadioContent>
  )) }
  </React.Fragment>
};

export const RadioFactory = (onChange: ChangeHandler) => (
  props: SelectProps<string>,
) => {
  return (
    <RadioInput
      {...props}
      key={`radio-input-${props.path}-${props.name}`}
      changeHandler={onChange}
    />
  );
};

import { DropdownContent } from '@roche/patterns-indicators/components/form-template/form-template.style';
import * as React from 'react';

import { ChangeHandler, SelectProps } from '../form-template.types';

class DropdownInput<T = number> extends React.Component<SelectProps<T>, {}> {
  constructor(props: SelectProps<T>) {
    super(props);
  }

  public render() {
    const { name, path, options, value } = this.props;
    return (
      <DropdownContent
        name={name}
        key={`dropdown-key-${path}-name`}
        onChange={this.makeChangeHandler(path, name)}
        defaultValue={value.toString()}
      >
        {options.map((option, i) => (
          <option key={`option-${i}`} value={`${option.value}`}>
            {option.text}
          </option>
        ))}
      </DropdownContent>
    );
  }

  public makeChangeHandler(path, fieldName) {
    return (event: React.ChangeEvent<any>) => {
      // tslint:disable-next-line:no-unused-expression
      this.props.changeHandler &&
        this.props.changeHandler(path, fieldName, Number(event.target.value));
    };
  }
}

export const DropdownFactory = (onChange: ChangeHandler) => (
  select: SelectProps<any>,
) => (
  <DropdownInput
    {...select}
    key={`dropdown-input-${select.path}-${select.name}`}
    changeHandler={onChange}
  />
);

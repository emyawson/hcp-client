import * as React from 'react';
import ReactSelect from 'react-select';

import { ArrowIcon } from 'src/assets/icons/arrow-icon';
import { colors } from 'src/core/styles/colors';

import { styleDropdownInput } from './input-dropdown.style';
import { InputDropdownProps } from './input-dropdown.types';

export const InputDropdownComponent: React.StatelessComponent<
  InputDropdownProps
> = ({
  disabled = false,
  id,
  label,
  onChange,
  options,
  placeholder,
  required,
  ...inputProps
}) => (
  <ReactSelect
    aria-label={label}
    arrowRenderer={() => (
      <span>
        <ArrowIcon height={8} fillColor={colors.charcoal} />
      </span>
    )}
    disabled={disabled}
    id={id}
    onChange={onChange}
    options={options}
    placeholder={placeholder}
    required={required}
    clearable={false}
    multi={false}
    searchable={false}
    simpleValue={true}
    {...inputProps}
  />
);
export const InputDropdown = styleDropdownInput(InputDropdownComponent);

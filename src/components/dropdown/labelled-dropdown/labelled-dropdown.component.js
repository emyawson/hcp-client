import React from 'react';

import { Dropdown } from 'src/components/dropdown';

import {
  DropdownLabel,
  LabelledDropdownContainerDiv,
} from './labelled-dropdown.style';

export const LabelledDropdown = ({
  disabled,
  label,
  labelIsInline,
  modelPath,
  options,
  placeholder,
  labelDecorator,
  onChange,
  ...props
}) => (
  <LabelledDropdownContainerDiv labelIsInline={labelIsInline}>
    <DropdownLabel htmlFor={modelPath} labelIsInline={labelIsInline}>
      {label}
      {labelDecorator && labelDecorator}
    </DropdownLabel>
    <Dropdown
      disabled={disabled}
      label={label}
      modelPath={modelPath}
      required
      searchable={false}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  </LabelledDropdownContainerDiv>
);

LabelledDropdown.defaultProps = {
  disabled: false,
};

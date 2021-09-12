import React from 'react';

import { Dropdown } from 'src/domains/diagnostics/components/dropdown';

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
  onChange,
}) => (
  <LabelledDropdownContainerDiv labelIsInline={labelIsInline}>
    <DropdownLabel htmlFor={modelPath} labelIsInline={labelIsInline}>
      {label}
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
    />
  </LabelledDropdownContainerDiv>
);

LabelledDropdown.defaultProps = {
  disabled: false,
};

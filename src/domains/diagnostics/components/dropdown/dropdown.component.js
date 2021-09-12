import React from 'react';

import { ControlSelect } from 'src/domains/diagnostics/components/forms';
import { ArrowIcon } from 'src/domains/diagnostics/assets/icons';
import { fontSize, spacing, colors } from 'src/domains/diagnostics/styles';
import { combineRems } from 'src/domains/diagnostics/utils';

import { DropdownContainer, BrandedSelect } from './dropdown.style';

export const Arrow = ({ arrowIconHeight = 8, fillColor = colors.grayDark }) => (
  <span>
    <ArrowIcon height={arrowIconHeight} fillColor={fillColor} />
  </span>
);

export const selectionHasValue = val => val && val.toString().length;

export const createValidators = required =>
  required ? { isRequired: selectionHasValue } : {};

export const Dropdown = ({
  required,
  modelPath,
  onChange,
  onOpen,
  label,
  placeholder,
  fillColor,
  borderless,
  arrowIconHeight,
  ...props
}) => (
  <DropdownContainer borderless={borderless}>
    <ControlSelect
      validators={createValidators(required)}
      model={modelPath}
      component={BrandedSelect}
      onChange={onChange}
      controlProps={{
        arrowRenderer: () => (
          <Arrow fillColor={fillColor} arrowIconHeight={arrowIconHeight} />
        ),
        required,
        borderless,
        // Styles
        menuContainerStyle: {},
        menuStyle: {},
        style: {},
        ...props,
      }}
      aria-label={label}
      placeholder={placeholder}
      {...props}
    />
  </DropdownContainer>
);
Dropdown.defaultProps = {
  id: '',
  label: '',
  modelPath: '',
  options: [],
  placeholder: '',
  autosize: false,
  multi: false,
  clearable: false,
  disabled: false,
  required: false,
  searchable: true,
  backspaceRemoves: false,
  optionFontSize: fontSize.p,
  selectedOptionPadding: spacing.three,
  selectHeight: combineRems(spacing.three, spacing.four),
  simpleValue: true,
  onChange: () => undefined,
};

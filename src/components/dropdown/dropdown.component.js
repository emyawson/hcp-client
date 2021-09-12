import React from 'react';

import { ControlSelect } from 'src/components/forms';
import { ArrowIcon } from 'src/assets/icons';
import { fontSize, spacing, colors } from 'src/core';
import { combineRems } from 'src/utils';

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
        borderless,
        // Styles
        menuContainerStyle: {},
        menuStyle: {},
        required,
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
  autosize: false,
  backspaceRemoves: false,
  clearable: false,
  disabled: false,
  id: '',
  label: '',
  modelPath: '',
  multi: false,
  onChange: () => undefined,
  optionFontSize: fontSize.p,
  options: [],
  placeholder: '',
  required: false,
  searchable: true,
  selectHeight: combineRems(spacing.three, spacing.four),
  selectedOptionPadding: spacing.three,
  simpleValue: true,
};

import { ArrowIcon } from '@roche/patterns-indicators/assets/icons';
import { ControlSelect } from '@roche/patterns-indicators/components/forms/control-select';
import * as React from 'react';
import 'react-select/dist/react-select.css';
import { withTheme } from 'styled-components';

import { BrandedSelect, DropdownContainer } from './dropdown.style';

export interface ArrowProps {
  colorFill?: string;
  iconHeight?: number;
}

export const Arrow = ({
  iconHeight = 8,
  colorFill = '#000000',
}: ArrowProps) => (
  <span>
    <ArrowIcon height={iconHeight} fillColor={colorFill} />
  </span>
);

export const selectionHasValue = val => val && val.toString().length;

export const createValidators = required =>
  required ? { isRequired: selectionHasValue } : {};

interface DropdownProps {
  theme: any;
  arrowIconHeight: number;
  autosize?: boolean;
  backspaceRemoves?: boolean;
  borderless?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  fillColor?: string;
  defaultValue?: any;
  id?: string;
  label?: string;
  modelPath?: string;
  multi?: boolean;
  onChange?: (event) => void;
  onOpen?: (event) => void;
  options?: any[];
  optionFontSize?: string;
  placeholder?: string;
  required?: boolean;
  searchable?: boolean;
  selectedOptionPadding?: string;
  selectHeight?: string;
  simpleValue?: boolean;
}

const DropdownComponent: React.SFC<DropdownProps> = (props: DropdownProps) => (
  <DropdownContainer borderless={props.borderless}>
    <ControlSelect
      validators={createValidators(props.required)}
      model={props.modelPath}
      component={BrandedSelect}
      onChange={props.onChange}
      controlProps={
        {
          arrowRenderer: () => (
            <Arrow
              colorFill={props.fillColor}
              iconHeight={props.arrowIconHeight}
            />
          ),
          required: props.required,
          borderless: props.borderless,
          menuContainerStyle: {},
          menuStyle: {},
          style: {},
          ...props,
        } // Styles
      }
      aria-label={props.label}
      placeholder={props.placeholder}
      {...props}
    />
  </DropdownContainer>
);
DropdownComponent.defaultProps = {
  arrowIconHeight: 8,
  borderless: true,
  id: '',
  label: '',
  modelPath: '.',
  options: [],
  placeholder: '',
  autosize: false,
  multi: false,
  clearable: false,
  disabled: false,
  required: false,
  searchable: true,
  backspaceRemoves: false,
  optionFontSize: '0.875rem',
  selectedOptionPadding: '1rem',
  selectHeight: '3rem',
  simpleValue: true,
  onChange: () => undefined,
};
export const Dropdown = withTheme(DropdownComponent);

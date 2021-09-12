import * as React from 'react';
import { withTheme } from 'styled-components';

import { ArrowIcon } from '@roche/patterns-indicators/assets/icons';
import { SelectOption } from '@roche/patterns-indicators/domains/pi-profile-setup';
import { IThemeInterface } from '@roche/patterns-indicators/theme';

import {
  DropdownSelectButton,
  DropdownSelectContainer,
  DropdownSelectDisplay,
  DropdownSelectDropdownContainer,
  DropdownSelectDropdownRow,
  DropdownSelectInputContainer,
} from './dropdown-select.styles';

export const Arrow = ({ iconHeight, colorFill }) => (
  <span>
    <ArrowIcon height={iconHeight} fillColor={colorFill} />
  </span>
);

interface DropdownSelectProps<T> {
  theme: any;
  options: T[];
  arrowIconHeight?: number;
  fillColor?: string;
  defaultValue?: T;
  placeholder?: string;
  width?: string;
  flex?: string;
  optionFontSize?: string;
  disabled?: boolean;
  onChange?: (x: T) => void;
  selectedOption?: SelectOption<string | number>;
}

interface DropdownSelectState {
  isOpen: boolean;
  selectedOption?: SelectOption<string | number>;
}

interface DropdownSelectDefaultProps {
  disabled: boolean;
  fillColor: string;
  arrowIconHeight: number;
}

type DropdownSelectPropsWithDefault = DropdownSelectProps<
  SelectOption<string | number>
> &
  DropdownSelectDefaultProps;

class DropdownSelectComponent extends React.Component<
  DropdownSelectProps<SelectOption<string | number>>,
  DropdownSelectState
> {
  public static defaultProps = {
    disabled: false,
    fillColor: '#000000',
    arrowIconHeight: 8,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectedOption: this.props.selectedOption,
    };
  }

  public componentDidMount() {
    if (
      !this.props.selectedOption &&
      (this.props.defaultValue && !this.props.disabled)
    ) {
      this.setState({ selectedOption: this.props.defaultValue });

      if (this.props.onChange) {
        this.props.onChange(this.props.defaultValue);
      }
    }
  }

  public componentDidUpdate(prevprops) {
    if (
      this.props.defaultValue &&
      this.props.defaultValue !== prevprops.defaultValue
    ) {
      this.setState({ selectedOption: this.props.defaultValue });

      if (this.props.onChange) {
        this.props.onChange(this.props.defaultValue);
      }
    }
  }

  public onOptionSelected = (
    selectedOption: SelectOption<string | number>,
  ) => () => {
    this.setState({
      isOpen: false,
      selectedOption,
    });

    if (this.props.onChange) {
      this.props.onChange(selectedOption);
    }
  };

  public render() {
    const {
      fillColor,
      arrowIconHeight,
      options,
      disabled,
      placeholder,
      width,
      flex,
      optionFontSize,
    } = this.props as DropdownSelectPropsWithDefault;

    const isOpenClass = this.state.isOpen ? 'is-open' : '';
    const isDisabledClass = disabled ? 'is-disabled' : '';
    const toggleDropdown = () => this.setState({ isOpen: !this.state.isOpen });

    return (
      <DropdownSelectContainer width={width} flex={flex}>
        <DropdownSelectInputContainer className={isOpenClass}>
          <DropdownSelectDisplay className={isDisabledClass}>
            {this.state.selectedOption
              ? this.state.selectedOption.label
              : placeholder
                ? placeholder
                : ''}
          </DropdownSelectDisplay>
          <DropdownSelectButton
            className={`${isDisabledClass} ${isOpenClass}`}
            disabled={disabled}
            onClick={toggleDropdown}
          >
            <Arrow colorFill={fillColor} iconHeight={arrowIconHeight} />
          </DropdownSelectButton>
        </DropdownSelectInputContainer>
        {this.state.isOpen ? (
          <DropdownSelectDropdownContainer>
            {options.map((option, idx) => (
              <DropdownSelectDropdownRow
                key={idx}
                onClick={this.onOptionSelected(option)}
                optionFontSize={optionFontSize}
              >
                {option.label}
              </DropdownSelectDropdownRow>
            ))}
          </DropdownSelectDropdownContainer>
        ) : null}
      </DropdownSelectContainer>
    );
  }
}

export const DropdownSelect = withTheme<
  { theme?: IThemeInterface } & DropdownSelectProps<
    SelectOption<string | number>
  >,
  IThemeInterface
>(DropdownSelectComponent);

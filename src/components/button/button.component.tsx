import * as React from 'react';

import { LoadingIndicator, LocalizedText } from 'src/components';
import { fontSize as fontSizes, spacing } from 'src/core';

import {
  BrandButton,
  ButtonContentSpan,
  ButtonIconSpan,
  ButtonLoadingIconSpan,
  ButtonTextSpan,
} from './button.style';

export type ButtonProps = {
  label: string;
  accessibilityLabel?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
  loading?: boolean;
  buttonStyle?: string;
  fontSize?: string;
  uppercase?: boolean;
  fontWeight?: string;
  minWidth?: number;
  m?: number;
  mr?: number;
  ml?: number;
  mt?: number;
  mb?: number;
  isCircleIcon?: boolean;
};

export const Button = ({
  accessibilityLabel = '',
  disabled = false,
  icon,
  label,
  loading,
  onClick,
  buttonStyle,
  fontSize,
  uppercase,
  fontWeight,
  minWidth,
  m,
  mr,
  ml,
  mt,
  mb,
  isCircleIcon,
  ...buttonProps
}: ButtonProps) => {
  const constructButtonContentBasedOnLoadingState = () => {
    if (loading) {
      return (
        <React.Fragment>
          <LocalizedText textKey="general.loading" />
          <ButtonLoadingIconSpan>
            <LoadingIndicator size={spacing.two} />
          </ButtonLoadingIconSpan>
        </React.Fragment>
      );
    }
    return (
      <ButtonContentSpan>
        {icon && <ButtonIconSpan>{icon}</ButtonIconSpan>}
        {label && <ButtonTextSpan>{label}</ButtonTextSpan>}
      </ButtonContentSpan>
    );
  };
  return (
    <BrandButton
      aria-label={accessibilityLabel || label}
      disabled={disabled}
      // @ts-ignore
      loading={loading}
      onClick={onClick}
      buttonStyle={buttonStyle}
      fontSize={fontSize}
      uppercase={uppercase}
      fontWeight={fontWeight}
      minWidth={minWidth}
      m={m}
      mr={mr}
      ml={ml}
      mt={mt}
      mb={mb}
      {...buttonProps}
    >
      {constructButtonContentBasedOnLoadingState()}
    </BrandButton>
  );
};

// @ts-ignore
Button.displayName = 'Button';

// @ts-ignore
Button.defaultProps = {
  accessibilityLabel: '',
  buttonStyle: 'primary',
  disabled: false,
  fontSize: fontSizes.p,
  loading: false,
  minWidth: '',
};

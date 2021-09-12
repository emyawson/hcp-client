import * as React from 'react';

import {
  LocalizedText,
  LoadingIndicator,
} from 'src/domains/diagnostics/components';
import { spacing, fontSize } from 'src/domains/diagnostics/styles';

import {
  BrandButton,
  ButtonContentSpan,
  ButtonIconSpan,
  ButtonTextSpan,
  ButtonLoadingIconSpan,
} from './button.style';

type Props = {
  label: string,
  onClick: () => void,
  accessibilityLabel?: string,
  disabled?: boolean,
  icon?: React.Element<*>,
  loading?: boolean,
  buttonStyle?: ButtonStyles,
  fontSize?: string,
  uppercase?: boolean,
  fontWeight?: 'bold' | 'semiBold',
  minWidth?: string,
};

export const Button = ({
  accessibilityLabel,
  disabled,
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
}: Props) => {
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
    >
      {constructButtonContentBasedOnLoadingState()}
    </BrandButton>
  );
};

Button.defaultProps = {
  accessibilityLabel: '',
  disabled: false,
  loading: false,
  buttonStyle: 'primary',
  fontSize: fontSize.p,
  minWidth: '',
};

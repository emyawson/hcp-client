import * as React from 'react';

import { BaseButton } from './button.style';

type ButtonProps = {
  children?: any;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  ariaLabel: string;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
};

export const Button: React.StatelessComponent<ButtonProps> = ({
  children,
  type = 'primary',
  disabled = false,
  ariaLabel,
  onClick,
}: ButtonProps) => (
  <BaseButton
    onClick={onClick}
    aria-label={ariaLabel}
    type={type}
    disabled={disabled}
  >
    {children}
  </BaseButton>
);

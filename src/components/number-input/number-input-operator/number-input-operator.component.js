import React from 'react';

import { NumberInputControlButton } from './number-input-operator.style';

export const NumberInputOperator = ({
  icon,
  operatorAction,
  position,
  disabled,
}) => (
  <NumberInputControlButton
    onClick={operatorAction}
    type="button"
    position={position}
    disabled={disabled}
  >
    {icon}
  </NumberInputControlButton>
);

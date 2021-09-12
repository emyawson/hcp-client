import React from 'react';

import { ArrowIcon } from 'src/assets/icons';

import {
  ArrowWrapperButton,
  ArrowSpan,
  ArrowIconUpSpan,
} from './arrow-button.style';

type Props = {
  active?: boolean,
  direction?: 'up' | 'down',
  disabled?: boolean,
  onClick?: () => void,
  size?: number,
};

export const ArrowButton = ({
  active,
  direction,
  disabled,
  onClick,
  size,
}: Props) => {
  const arrowSize = size / 4;
  const arrowIconByDirection = () => {
    if (direction === 'up') {
      return (
        <ArrowIconUpSpan direction={direction}>
          <ArrowIcon height={arrowSize} />
        </ArrowIconUpSpan>
      );
    }
    return <ArrowIcon height={arrowSize} />;
  };
  return (
    <ArrowWrapperButton disabled={disabled} onClick={onClick}>
      <ArrowSpan disabled={disabled} size={size}>
        {arrowIconByDirection()}
      </ArrowSpan>
    </ArrowWrapperButton>
  );
};
ArrowButton.defaultProps = {
  active: false,
  direction: 'down',
  disabled: false,
  onClick: () => undefined,
  size: 24,
};

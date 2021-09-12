import React from 'react';
import { equals } from 'ramda';

import { ArrowIcon } from 'src/domains/diagnostics/assets/icons';

import { CaretIconButton, CaretIconUpSpan } from './caret-button.style';
import { CARET_MODE, CARET_DIRECTION } from './caret-button.constant';

const CaretIconUp = () => (
  <CaretIconUpSpan>
    <ArrowIcon height={8} />
  </CaretIconUpSpan>
);

const CaretIconDown = () => <ArrowIcon height={8} />;

export const CaretButton = ({
  direction = CARET_DIRECTION.DOWN,
  mode = CARET_MODE.DEFAULT,
}) => (
  <CaretIconButton type="button" mode={mode}>
    {equals(direction, CARET_DIRECTION.DOWN) ? CaretIconDown() : CaretIconUp()}
  </CaretIconButton>
);

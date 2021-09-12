import React from 'react';

import { colors } from 'src/core/styles/colors';
import { LocalizedText } from 'src/components';
import { stopPropagation } from 'src/utils';
import { PlusIcon } from 'src/assets/icons';

import {
  AddPrescriptionButton,
  CircleButton,
  CircleButtonSymbol,
} from './add-prescription.style';

export const AddButton = ({ clickHandler }) => (
  <CircleButton onClick={stopPropagation(clickHandler)}>
    <CircleButtonSymbol bold>
      <PlusIcon fillColor={colors.white} />
    </CircleButtonSymbol>
  </CircleButton>
);

export const AddPrescription = ({ disabled, expandHandler }) => (
  <AddPrescriptionButton
    role="button"
    onClick={expandHandler}
    disabled={disabled}
  >
    <AddButton clickHandler={expandHandler} />
    <span>
      <LocalizedText textKey="prescription.createNewTemporary" />
    </span>
  </AddPrescriptionButton>
);

import { not, equals } from 'ramda';

import { translate } from 'src/i18n';

import {
  frequencyTranslationKeyBase,
  periodTranslationKeyBase,
} from './prescription.constants';
import { CLINIC_GUIDE_TYPES } from './prescription.constants';

export const therapyToDropdownOption = ({ id, name }) => ({
  value: id,
  label: name,
});

export const clinicGuideToDropdownOption = ({ id, name, isActive, type }) => ({
  value: id,
  label: name,
  inactive: not(isActive) && equals(type, CLINIC_GUIDE_TYPES.CUSTOM),
});

export const frequencyToDropdownOption = ({ id }) => ({
  value: id,
  label: translate(`${frequencyTranslationKeyBase}${id}`),
});

export const stripModelToDropdownOption = ({ id, name }) => ({
  value: id,
  label: name,
});

export const quantityToDropdownOption = quantity => ({
  value: quantity,
  label: quantity,
});

export const periodToDropdownOption = period => ({
  value: period,
  label: translate(`${periodTranslationKeyBase}${period}`),
});

export const reasonToDropdownOption = ({ id, description }) => ({
  value: id,
  label: description,
});

import { translate } from 'src/i18n';

import {
  frequencyTranslationKeyBase,
  periodTranslationKeyBase,
} from './prescription.constants';
import {
  therapyToDropdownOption,
  clinicGuideToDropdownOption,
  frequencyToDropdownOption,
  stripModelToDropdownOption,
  quantityToDropdownOption,
  periodToDropdownOption,
  reasonToDropdownOption,
} from './prescription.transforms';

const PLACEHOLDER_ID = 'abc-123-456-zyx';

describe('Prescription dropdown data transforms', () => {
  it('Transforms a therapy to dropdown option', () => {
    const input = {
      name: 'Diabetes Type 1',
      id: PLACEHOLDER_ID,
    };
    const output = {
      label: input.name,
      value: input.id,
    };
    expect(therapyToDropdownOption(input)).toEqual(output);
  });
  it('Transforms a clinic guide to dropdown option', () => {
    const input = {
      name: 'Insuline',
      id: PLACEHOLDER_ID,
      type: 'CUSTOM',
      isActive: false,
    };
    const output = {
      label: input.name,
      value: input.id,
      inactive: true,
    };
    expect(clinicGuideToDropdownOption(input)).toEqual(output);
  });
  it('Transforms a frequency to dropdown option', () => {
    const input = {
      id: 'twoWeeks',
    };
    const output = {
      label: translate(`${frequencyTranslationKeyBase}${input.id}`), // "Two Weeks"
      value: 'twoWeeks',
    };
    expect(frequencyToDropdownOption(input)).toEqual(output);
  });
  it('Transforms a Strip Model to dropdown option', () => {
    const input = {
      name: 'Accu Check Test Strip',
      id: PLACEHOLDER_ID,
    };
    const output = {
      label: input.name,
      value: input.id,
    };
    expect(stripModelToDropdownOption(input)).toEqual(output);
  });
  it('Transforms a quantity to option', () => {
    const input = 99;
    const output = {
      label: input,
      value: input,
    };
    expect(quantityToDropdownOption(input)).toEqual(output);
  });
  it('Transforms a period to dropdown option', () => {
    const input = 'days';
    const output = {
      label: translate(`${periodTranslationKeyBase}${input}`), // "Day"
      value: input,
    };
    expect(periodToDropdownOption(input)).toEqual(output);
  });
  it('Transforms a temporary prescription reason to dropdown option', () => {
    const input = {
      description: 'Pregnant',
      id: PLACEHOLDER_ID,
    };
    const output = {
      label: input.description,
      value: input.id,
    };
    expect(reasonToDropdownOption(input)).toEqual(output);
  });
});

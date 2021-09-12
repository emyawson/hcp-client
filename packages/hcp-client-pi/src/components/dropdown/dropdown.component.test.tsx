import { shallow } from 'enzyme';
import * as React from 'react';

import { ArrowIcon } from 'src/assets/icons';

import {
  Arrow,
  createValidators,
  Dropdown,
  selectionHasValue,
} from './dropdown.component';

describe('dropdown test suite', () => {
  test('it renders correctly', () => {
    const wrapper = shallow(
      <Dropdown
        label="Drop down"
        placeholder="The placeholder"
        modelPath=".dropdown"
        options={[
          { label: 'Uno', value: 1 },
          { label: 'Dos', value: 2 },
          { label: 'Tres', value: 3 },
        ]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('creates RRF validators if the input is required', () => {
    expect(createValidators(true).isRequired).toBeDefined();
    expect(createValidators(false)).toEqual({});
  });
  it('validates selected option when required', () => {
    expect(selectionHasValue('test')).toBeTruthy();
    expect(selectionHasValue(null)).toBeFalsy();
    expect(selectionHasValue(1)).toBeTruthy();
    expect(selectionHasValue(undefined)).toBeFalsy();
  });
});

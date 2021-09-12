import * as enzyme from 'enzyme';
import * as React from 'react';

import { SelectProfileTypeComponent } from './select-profile-type.component';

describe('select delivery type test suite', () => {
  test('it renders correctly', () => {
    const tree = enzyme.shallow(
      <SelectProfileTypeComponent
        profileType="basic"
        options={{
          hasHomeDelivery: false,
          hasPickup: true,
        }}
      />,
    );
    expect(tree.find(SelectProfileTypeComponent)).toBeTruthy();
  });
});

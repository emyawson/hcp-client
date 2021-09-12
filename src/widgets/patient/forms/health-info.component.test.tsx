import * as enzyme from 'enzyme';
import * as React from 'react';

import { HealthInfo } from './health-info.component';

describe('health info test suite', () => {
  test('it renders correctly', () => {
    const tree = enzyme.shallow(
      <HealthInfo onNext={() => null} onBack={() => null} />,
    );
    expect(tree.find(HealthInfo)).toBeTruthy();
  });
});

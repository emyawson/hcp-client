import * as enzyme from 'enzyme';
import * as React from 'react';

import { PatientInfo } from './patient-info.component';

describe('patient info test suite', () => {
  test('it renders correctly', () => {
    const tree = enzyme.shallow(
      <PatientInfo onNext={() => null} onBack={() => null} />,
    );
    expect(tree.find(PatientInfo)).toBeTruthy();
  });
});

import * as enzyme from 'enzyme';
import * as React from 'react';

import { ControlCheckbox } from './control-checkbox.component';

describe('Checkbox Form Control test suite', () => {
  const mockProps = {
    modelPath: 'test',
  };
  test('should render correctly', () => {
    const tree = enzyme.shallow(<ControlCheckbox {...mockProps} />);
    expect(tree.find(<ControlCheckbox {...mockProps} />)).toBeTruthy();
  });
});

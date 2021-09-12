import * as enzyme from 'enzyme';
import * as React from 'react';

import { LoginComponent } from './login.component';

describe('login component test suite', () => {
  it('it renders correctly', () => {
    const tree = enzyme.mount(<LoginComponent />);
    expect(tree.find('#gigya-screenset-Dev-RegistrationLogin')).toHaveLength(1);
  });
});

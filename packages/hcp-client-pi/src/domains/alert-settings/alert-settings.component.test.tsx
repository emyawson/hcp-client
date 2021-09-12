import { shallow } from 'enzyme';
import * as React from 'react';

import { AlertSettings } from './alert-settings.component';

describe('VerticalTabsComponent test suite', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <AlertSettings
        changeHandler={() => ({})}
        configDetails={[]}
        configState={{ mock: { mock: 'mockValue' } }}
        theme={{}}
        translationText={{ mock: 'mockValue' }}
        validationConfig={{ mock: null }}
      />,
    );
    expect(wrapper).toBeDefined();
  });
});

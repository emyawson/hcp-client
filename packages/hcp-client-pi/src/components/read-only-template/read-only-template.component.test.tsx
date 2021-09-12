import { shallow } from 'enzyme';
import * as React from 'react';

import { ReadOnlyTemplateComponent } from './read-only-template.component';

describe('Read Only component', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <ReadOnlyTemplateComponent template={''} state={{}} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

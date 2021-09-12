import React from 'react';
import { shallow } from 'enzyme';

import { EConectaFrame } from './e-conecta-frame.component';

describe('EC6 Iframe Component Test', () => {
  const mockProps = {
    action: 'test',
    token: '123456',
  };

  it('should render correctly', () => {
    const wrapper = shallow(<EConectaFrame {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});

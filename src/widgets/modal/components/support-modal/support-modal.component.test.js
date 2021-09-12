import React from 'react';
import { shallow } from 'enzyme';

import { LocalizedText } from 'src/components';

import { SupportModal } from './support-modal.component';

import { CommonHeader, ModalBody } from '../../modal.style';

describe('Login test suites', () => {
  let wrapper = null;
  beforeAll(() => {
    wrapper = shallow(<SupportModal destroyModal={() => false} data={{}} />);
  });

  it('should have these elements', () => {
    expect(wrapper.find(LocalizedText)).toHaveLength(3);
    expect(wrapper.find(CommonHeader)).toHaveLength(1);
    expect(wrapper.find(ModalBody)).toHaveLength(1);
  });
});

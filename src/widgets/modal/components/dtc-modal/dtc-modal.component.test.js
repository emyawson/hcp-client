import React from 'react';
import { shallow } from 'enzyme';

import { DTCModalComponent } from './dtc-modal.component';

import { CommonHeader, ModalBody } from '../../modal.style';

describe('Login test suites', () => {
  let wrapper = null;
  beforeAll(() => {
    wrapper = shallow(
      <DTCModalComponent destroyModal={() => false} data={{}} />,
    );
  });

  it('should have these elements', () => {
    expect(wrapper.find(CommonHeader)).toHaveLength(1);
    expect(wrapper.find(ModalBody)).toHaveLength(1);
  });
});

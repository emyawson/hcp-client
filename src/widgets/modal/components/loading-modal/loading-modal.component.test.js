import React from 'react';
import { shallow } from 'enzyme';

import { LOADING_MODAL_STATUS } from 'src/core/modal/modal.constants';

import { LoadingModal } from './loading-modal.component';

describe('Loading Modal test suites', () => {
  let wrapper = null;
  const props = { data: { status: LOADING_MODAL_STATUS.LOADING } };
  beforeAll(() => {
    wrapper = shallow(<LoadingModal {...props} />);
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

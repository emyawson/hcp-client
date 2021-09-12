import React from 'react';
import { shallow } from 'enzyme';

import { Comment } from './comment.component';

describe('Comment Component tests', () => {
  const mockProps = {
    date: 'June 01 2018',
    isExpanded: false,
    title: 'Force Status',
    message:
      'The patient has not achieved the required conditions and must see the practitioner for the strips.',
    showIcon: false,
  };
  it('should render correctly', () => {
    const wrapper = shallow(<Comment {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});

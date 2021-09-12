import React from 'react';
import { shallow } from 'enzyme';

import { CardHeader } from './card-header.component';

describe('Card header component', () => {
  const defaultProps = {
    cardStyles: ['secondary'],
    title: 'title',
  };
  const expandableProps = {
    ...defaultProps,
    expandable: true,
    link: '/',
  };
  const customHeaderProps = {
    ...defaultProps,
    customHeaderComponent: <div>hi</div>,
  };
  it('Renders properly', () => {
    const wrapper = shallow(<CardHeader {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Renders with expandable props', () => {
    const wrapper = shallow(<CardHeader {...expandableProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Renders with custom header', () => {
    const wrapper = shallow(<CardHeader {...customHeaderProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});

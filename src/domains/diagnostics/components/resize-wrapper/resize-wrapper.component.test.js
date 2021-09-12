import React from 'react';
import { shallow, mount } from 'enzyme';

import { ResizeWrapper } from './resize-wrapper.component';

describe('Resize wrapper component', () => {
  const baseProps = {
    render: height => <div>sample</div>,
    resizeFunction: () => 3,
  };

  it('Renders correctly', () => {
    const mockProps = {
      ...baseProps,
      disableResize: false,
      minHeight: 0,
    };
    const wrapper = shallow(<ResizeWrapper {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Assigns wrapper correctly', () => {
    const root = mount(<ResizeWrapper {...baseProps} />);
    root.instance().setHeight();
    expect(root.instance().wrapper).toBe(root.find('Wrapper').getDOMNode());
  });

  it('Sets height correctly', () => {
    const mockProps = {
      ...baseProps,
      resizeFunction: height => height,
    };
    const root = mount(<ResizeWrapper {...mockProps} />);
    root.instance().setHeight();
    expect(root.state('height')).toEqual(root.instance().wrapper.clientHeight);
  });
});

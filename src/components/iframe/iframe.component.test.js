import { shallow, mount } from 'enzyme';
import React from 'react';

import { convertPxToRem } from 'src/utils';

import { IFrame } from './iframe.component';

describe('IFrame component', () => {
  const mockProps = {
    title: 'Title',
    width: '100%',
    height: '100%',
    src: '/link',
    frameBorder: 0,
    resizeOnLoad: true,
    onLoad: () => {},
    styleProps: {},
    align: 'left',
  };

  it('renders correctly', () => {
    const wrapper = shallow(<IFrame {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('resizes frame', () => {
    const wrapper = shallow(<IFrame {...mockProps} />);
    const mockIFrameObj = {
      contentWindow: {
        document: {
          body: {
            scrollHeight: 900,
          },
        },
      },
    };
    wrapper.instance().resizeFrame(mockIFrameObj);
    expect(mockIFrameObj.height).toEqual(convertPxToRem(900));
  });

  it('calls the provided on load function', () => {
    const mockOnLoad = jest.fn();
    const props = {
      title: 'Title',
      height: '100%',
      src: '/link',
      align: 'left',
      resizeOnLoad: false,
      onLoad: mockOnLoad,
    };
    const wrapper = mount(<IFrame {...props} />);
    wrapper
      .find('iframe')
      .props()
      .onLoad();
    expect(mockOnLoad).toBeCalled();
  });
});

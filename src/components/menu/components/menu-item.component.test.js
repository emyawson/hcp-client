import React from 'react';
import { shallow } from 'enzyme';

import {
  StyledButton,
  StyledLink,
  SelectedLine,
  LocalizedText,
} from 'src/components';

import { MenuItem } from './menu-item.component';

describe('Menu item component', () => {
  const mockIcon = () => <span>icon</span>;

  it('renders correctly', () => {
    const mockProps = {
      item: {
        icon: mockIcon,
        name: 'dtcIcon',
        type: 'BUTTON',
      },
      onClick: () => null,
    };
    const wrapper = shallow(<MenuItem {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders button', () => {
    const mockProps = {
      item: {
        icon: mockIcon,
        name: 'dtcIcon',
        type: 'BUTTON',
      },
      onClick: () => null,
    };
    const wrapper = shallow(<MenuItem {...mockProps} />);
    expect(wrapper.find(StyledButton)).toHaveLength(1);
    expect(wrapper.find(StyledLink)).toHaveLength(0);
  });
  it('renders link', () => {
    const mockProps = {
      item: {
        icon: mockIcon,
        name: 'other',
        type: 'LINK',
      },
      onClick: () => null,
    };
    const wrapper = shallow(<MenuItem {...mockProps} />);
    expect(wrapper.find(StyledButton)).toHaveLength(0);
    expect(wrapper.find(StyledLink)).toHaveLength(1);
  });
  it('does not render line and item name when item is logo', () => {
    const mockProps = {
      item: {
        icon: mockIcon,
        name: 'logoIcon',
        type: 'LINK',
      },
    };
    const wrapper = shallow(<MenuItem {...mockProps} />);
    expect(wrapper.find(SelectedLine)).toHaveLength(0);
    expect(wrapper.find(LocalizedText)).toHaveLength(0);
  });
});

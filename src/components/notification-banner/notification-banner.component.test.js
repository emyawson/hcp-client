import React from 'react';
import { shallow } from 'enzyme';

import { FlagIcon } from 'src/assets/icons';
import { theme } from 'src/theme';
import { mountWithTheme } from 'src/test/render-with-theme';

import { NotificationBanner } from './notification-banner.component';

describe('Notification Banner Tests', () => {
  const mockProps = {
    text: 'This is a test banner',
  };

  it('should render correctly', () => {
    const wrapper = shallow(<NotificationBanner {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render an icon based on props', () => {
    const iconWrapper = shallow(<NotificationBanner {...mockProps} showIcon />);
    expect(iconWrapper.find(FlagIcon).exists()).toBeTruthy();
    const wrapper = mountWithTheme(
      <NotificationBanner {...mockProps} showIcon={false} />,
      theme,
    );
    expect(wrapper.find(FlagIcon).exists()).toBeFalsy();
  });
});

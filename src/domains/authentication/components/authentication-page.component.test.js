import React from 'react';
import { shallow } from 'enzyme';

import { AuthenticationPage } from './authentication-page.component';
import { LogoDiv, PageBody } from './authentication.style';

describe('Authentication page test', () => {
  let wrapper = null;
  beforeAll(() => {
    wrapper = shallow(
      <AuthenticationPage>
        <div id="children">children</div>
      </AuthenticationPage>,
    );
  });
  it('should have a logo component', () => {
    expect(wrapper.find(LogoDiv)).toHaveLength(1);
  });
  it('should have a logo component', () => {
    expect(wrapper.find(PageBody)).toHaveLength(1);
  });
  it('should have children', () => {
    expect(wrapper.find('#children').html()).toBe(
      '<div id="children">children</div>',
    );
  });
});

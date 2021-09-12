import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { getToken } from 'src/core/authentication/authentication.selectors';

import { withToken } from './with-token/';

const renderWithStoreAndProvider = store => components =>
  mount(<Provider store={store}>{components}</Provider>);

// TODO: fix mocking
describe.skip('With Token HoC Test Suite', () => {
  beforeAll(() => {
    jest.mock('src/core/authentication/authentication.selectors');
  });
  getToken.mockResolvedValue('ec7-123');

  const mockStore = configureMockStore();
  const store = mockStore({});
  const renderWithProvider = renderWithStoreAndProvider(store);

  const Component = () => <span />;

  it('should return the wrapped component with EC6 and EC7 tokens', () => {
    const WithToken = withToken(Component);
    const wrapper = renderWithProvider(<WithToken />);
    const wrappedComponent = wrapper.find(Component);
    expect(wrappedComponent.props().token).resolves.toBe('ec7-123');
  });
});

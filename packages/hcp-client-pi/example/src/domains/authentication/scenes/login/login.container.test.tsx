import * as enzyme from 'enzyme';
import * as React from 'react';
import { createMockStore, MockProvider } from 'src/test';

import { LoginComponent } from './login.component';
import { LoginContainer } from './login.container';

describe('Counter Container test suite', () => {
  let store;
  let tree;
  beforeAll(() => {
    store = createMockStore({
      state: {},
      reducers: {},
    });

    tree = enzyme.mount(
      <MockProvider store={store}>
        <LoginContainer />
      </MockProvider>,
    );
  });

  it('should mount the counter container', () => {
    expect(tree.find(LoginComponent).props().dispatch).toBeDefined();
    expect(tree.find(LoginComponent).props().goTo).toBeDefined();
  });
});

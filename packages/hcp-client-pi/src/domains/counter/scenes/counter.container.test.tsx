import * as enzyme from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';

import { PATTERNS_AND_INDICATORS_NAMESPACE } from '@roche/patterns-indicators/constants/namespace.constants';
import { counterReducer } from '@roche/patterns-indicators/domains/counter';
import { createMockStore } from '@roche/patterns-indicators/test';

import { Counter } from './counter.component';
import { CounterContainer } from './counter.container';

describe('Counter Container test suite', () => {
  let store;
  let tree;
  beforeAll(() => {
    const mockState = {
      [PATTERNS_AND_INDICATORS_NAMESPACE]: {
        counter: {
          counter: 0,
          randomCounter: 2,
        },
      },
    };

    store = createMockStore({
      state: mockState,
      reducers: { counter: counterReducer },
    });

    tree = enzyme.mount(
      <Provider store={store}>
        <CounterContainer />
      </Provider>,
    );
  });

  it('should mount the counter container', () => {
    expect(tree.find(Counter).props().counter).toBe(0);
  });
  it('should simulate a click', () => {
    tree
      .find('button', { button: 0 })
      .first()
      .simulate('click');

    expect(
      store.getState()[PATTERNS_AND_INDICATORS_NAMESPACE].counter.counter,
    ).toBe(1);
  });
});

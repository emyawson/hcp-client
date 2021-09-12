import { mount, shallow } from 'enzyme';
import { I18nextProvider } from 'react-i18next';

import * as React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { PATTERNS_AND_INDICATORS_NAMESPACE } from '@roche/patterns-indicators/constants/namespace.constants';
import { AdvancedIndicatorsReducer } from '@roche/patterns-indicators/dashboards/advanced-indicators';
import { i18n } from '@roche/patterns-indicators/i18n';
import { createMockStore, mockTheme } from '@roche/patterns-indicators/test';

import { AdvancedIndicators } from './advanced-indicators.component';
import { AdvancedIndicatorsContainer } from './advanced-indicators.container';

describe('AdvancedIndicators Container test suite', () => {
  let store;
  let tree;
  beforeAll(() => {
    const mockState = {
      [PATTERNS_AND_INDICATORS_NAMESPACE]: {
        advancedIndicators: {
          selectedTabId: 'warnings',
        },
      },
    };

    store = createMockStore({
      state: mockState,
      reducers: { advancedIndicators: AdvancedIndicatorsReducer },
    });

    tree = mount(
      <ThemeProvider theme={mockTheme}>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <AdvancedIndicatorsContainer />
          </I18nextProvider>
        </Provider>
      </ThemeProvider>,
    );
  });

  it('should mount the Advanced Indicators container', () => {
    tree.update();
    expect(tree.contains(<AdvancedIndicatorsContainer />)).toBeTruthy();
  });

  it('should render correct tab content child when tab is clicked', () => {
    tree.update();

    expect(
      store.getState()[PATTERNS_AND_INDICATORS_NAMESPACE].advancedIndicators
        .selectedTabId,
    ).toBe('warnings');

    tree
      .find('li')
      .at(1)
      .simulate('click');

    expect(
      store.getState()[PATTERNS_AND_INDICATORS_NAMESPACE].advancedIndicators
        .selectedTabId,
    ).toBe('compare');

    expect(
      tree
        .find('li')
        .at(1)
        .hasClass('active'),
    ).toEqual(true);

    expect(
      tree
        .find('li')
        .at(0)
        .hasClass('active'),
    ).toEqual(false);

    expect(tree.find('TabContent').text()).toContain('Variability');
  });
});

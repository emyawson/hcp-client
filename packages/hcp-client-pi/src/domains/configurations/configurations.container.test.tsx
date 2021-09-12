import { mount } from 'enzyme';
import { I18nextProvider } from 'react-i18next';

import * as React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { PATTERNS_AND_INDICATORS_NAMESPACE } from '@roche/patterns-indicators/constants/namespace.constants';
import { i18n } from '@roche/patterns-indicators/i18n';
import { createMockStore, mockTheme } from '@roche/patterns-indicators/test';

import { ConfigurationsContainer } from './configurations.container';

describe('Configurations Container test suite', () => {
  let store;
  let tree;
  let mockProps;
  beforeAll(() => {
    const mockState = {
      [PATTERNS_AND_INDICATORS_NAMESPACE]: {
        forms: {
          currentState: {},
        },
        piProfileSetup: {
          profileType: 'meter',
        },
      },
    };

    store = createMockStore({
      state: mockState,
    });

    mockProps = {
      toggleDisplay: () => undefined,
    };

    tree = mount(
      <ThemeProvider theme={mockTheme}>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ConfigurationsContainer {...mockProps} />
          </I18nextProvider>
        </Provider>
      </ThemeProvider>,
    );
  });

  it('should mount the Configurations container', () => {
    tree.update();
    expect(
      tree.contains(<ConfigurationsContainer {...mockProps} />),
    ).toBeTruthy();
  });
});

import * as React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { injectGlobal, ThemeProvider } from 'styled-components';
import 'normalize.css';
import 'react-virtualized/styles.css';
import 'react-vis/dist/style.css';
import 'react-select/dist/react-select.css';
import 'core-js/fn/object/keys';
import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';
import 'core-js/fn/array/from';
import 'core-js/fn/array/includes';
import 'core-js/fn/string/ends-with';
import 'core-js/fn/string/starts-with';
import 'core-js/fn/string/includes';
import 'core-js/fn/string/repeat';
import 'core-js/fn/array/find-index';
import 'core-js/es6/math';
import 'core-js/fn/number';
import 'intl';
import 'core-js/es6/set';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

import { ModalContainer as Modal } from 'src/widgets';
import { theme } from 'src/theme';

import { Block } from './components/block';
import { Column } from './components/column';
import { LoadingRing } from './components/loading-ring';
import { Bundle } from './navigation/bundle';
import { configureStore } from './store';
import { i18n } from './i18n';
import { colors, BASE_FONT_SIZE, APP_MIN_WIDTH } from './core/styles';
import { injectScript } from './inject-script';
import { Config } from './core/env';

export const { persistor, store, history } = configureStore({});
const { REACT_APP_GIGYA_TOKEN } = Config;

// tslint:disable:no-unused-expression
injectGlobal`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: ${BASE_FONT_SIZE}px;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${colors.silverLight};
    min-width: ${APP_MIN_WIDTH};
  }

  body,
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: "Nunito", -apple-system,BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  ::selection {
    background: ${colors.brandBlue};
    color: ${colors.white};
  }

  @media print {
    body {
      -webkit-print-color-adjust: exact;
      color-adjust: exact;
    }

    section,
    img,
    svg,
    table,
    ul  {
      page-break-inside: avoid;
    }

    .print-hide {
      display: none;
    }

    .print-no-m {
      margin: 0;
    }

     @page {
        size: portrait;
    }
  }`; // tslint:enable:no-unused-expression

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    injectScript({
      onError: () => {
        this.setState({
          isError: false,
        });
      },
      onLoad: () => {
        this.setState({
          isLoading: false,
        });
      },
      path: 'https://cdns.gigya.com/js/gigya.js',
      queryParams: {
        apiKey: REACT_APP_GIGYA_TOKEN,
        lang: i18n.language,
      },
    });
  }

  render() {
    const { NavigationContainer } = this.props;
    const { isLoading, isError } = this.state;
    if (isError) {
      return <div>Something went wrong</div>;
    }
    if (isLoading) {
      return (
        <Column align="center" height="100vh" justifyContent="center">
          <LoadingRing infinite />
        </Column>
      );
    }
    return (
      <section id="AppContainer">
        <Route path="/" component={NavigationContainer} />
        <Modal />
        <Block id="version" display="none">
          {process.env.REACT_APP_VERSION}
        </Block>
      </section>
    );
  }
}

AppContainer.displayName = 'AppContainer';

export const App = ({ NavigationContainer }) => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <React.Fragment>
          <ThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
              <AppContainer NavigationContainer={NavigationContainer} />
            </ConnectedRouter>
          </ThemeProvider>
          <div id="tool-tip-root" />
        </React.Fragment>
      </I18nextProvider>
    </PersistGate>
  </Provider>
);

export const AppBundle = props => (
  <Bundle
    bundleWillLoad={async () => {
      const {
        NavigationContainer,
      } = await import(/* webpackChunkName: "app-bundle" */ 'src/navigation/navigation.container');
      return NavigationContainer;
    }}
    bundleDidLoad={NavigationContainer => (
      <App NavigationContainer={NavigationContainer} />
    )}
  />
);

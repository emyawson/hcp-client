import React from 'react';
import { equals } from 'ramda';

import {
  NoDataDisclaimer,
  withLoaderErrorOnTimeout,
} from 'src/domains/diagnostics/components';
import { translate } from 'src/i18n'; // TODO: move to diagnostics

const loaderOptions = loadingMessage => ({
  loaderProps: {
    flexibleHeight: true,
    infinite: true,
    minHeight: 'inherit',
    text: loadingMessage || translate('graphs.loading'),
  },
  validators: {
    isLoading: equals(false),
  },
});

const createErrorOptions = options => ({
  ErrorComponent: () => (
    <NoDataDisclaimer
      size={options.size}
      message={translate('graphs.noAvailableData')}
    />
  ),
});

export const withGraphLoader = (Component, loadingMessage, options = {}) =>
  withLoaderErrorOnTimeout({
    errorOptions: createErrorOptions(options),
    loaderOptions: loaderOptions(loadingMessage),
  })(Component);

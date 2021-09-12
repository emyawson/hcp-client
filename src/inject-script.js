import { queryParamsToQueryString } from './utils/url';

export const injectScript = ({ path, queryParams, onError, onLoad }) => {
  const script = document.createElement('script');
  script.src = `${path}?${queryParamsToQueryString(queryParams)}`;
  script.onload = onLoad;
  script.onerror = onError;
  document.body.appendChild(script);
};

import { configure } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import 'jest-localstorage-mock';
import 'jest-styled-components';

configure({ adapter: new ReactSixteenAdapter() });

global.process.env = {
  NODE_PATH: './',
  NODE_ENV: 'test',
};

// @ts-ignore
global.fetch = (() => {
  const myFetch = require('isomorphic-fetch');
  return (url, ...opts) => myFetch('http://localhost:3000' + url, ...opts);
})();

Object.defineProperty(window, 'REACT_APP', {
  writable: true,
  value: {
    REACT_APP_API_VERSION: 'v1',
    REACT_APP_API_ROOT: 'api',
    REACT_APP_GIGYA_TOKEN: '1234tokengigya',
  },
});

Object.defineProperty(window, 'gigya', {
  writable: true,
  value: {
    accounts: {
      addEventHandlers: ({ onLogin }) =>
        onLogin({
          UID: 1,
          errorCode: 0,
          data: { HCPIsActive: true, HCPIsAccessible: true },
        }),
      getScreenSets: ({ callback }) => {
        callback('getScreenSets response');
      },
      showScreenSet: () => null,
      getJWT: ({ callback }) => callback({ id_token: 1 }),
      getAccountInfo: ({ callback }) =>
        callback({
          UID: 1,
          errorCode: 0,
          data: { HCPIsActive: true, HCPIsAccessible: true },
        }),
    },
  },
});

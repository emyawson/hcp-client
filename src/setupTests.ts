import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import 'jest-localstorage-mock';
import 'jest-fetch-mock';

process.env.REACT_APP_EC6_API_ROOT = 'http://localhost:3000';

configure({ adapter: new Adapter() });

global.Intl = require('intl');

global.cancelAnimationFrame = callback => {
  setTimeout(callback, 0);
};

global.fetch = (() => {
  const myFetch = require('isomorphic-fetch');
  return (url, ...opts) =>
    myFetch(
      (url && !url.startsWith('http') ? 'http://localhost:3000' : '') + url,
      ...opts,
    );
})();

global.gigya = {
  accounts: {
    getScreenSets: ({ callback }) => {
      callback('getScreenSets response');
    },
    showScreenSet: ({ onAfterScreenLoad }) =>
      onAfterScreenLoad('showScreenSet response'),
    getJWT: ({ callback }) => callback({ id_token: 1 }),
    getAccountInfo: ({ callback }) =>
      callback({
        UID: 1,
        errorCode: 0,
        data: {
          HCPIsActive: true,
          HCPIsAccessible: true,
          FHIR_UserType: 'Practitioner',
        },
      }),
  },
};

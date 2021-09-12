const { compose } = require('ramda');
const path = require('path');
const rewireTypescript = require('react-app-rewire-typescript');
const rewireAlias = require('./rewire-alias');
module.exports = function override(config, env) {
  const rewire = compose(
    rewireAlias({
      alias: {
        'styled-components': path.resolve(__dirname, 'node_modules/styled-components'),
        'styled-system': path.resolve(__dirname, 'node_modules/styled-system'),
      },
    }),
  );
  const rewiredConfig = rewire(config);
  return rewireTypescript(rewiredConfig, env, {
    configFile: 'tsconfig.module.json',
  });
};

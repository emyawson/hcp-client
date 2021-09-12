const path = require('path');
const HappyPack = require('happypack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


module.exports = (baseConfig, env, config) => {
  baseConfig.module.rules.push({
    test: /\.(tsx?)$/,
    exclude: /node_modules/,
    loader: 'happypack/loader?id=ts',
  }, {
    test: /\.css$/,
    use: [
      { loader: require.resolve('style-loader') },
      { loader: require.resolve('css-loader') }
    ]
  });

  baseConfig.resolve.extensions.push('.ts', '.tsx', '.md');
  baseConfig.resolve.alias = {
    ...(baseConfig.resolve.alias || {}),
    '@roche/patterns-indicators': path.resolve(__dirname, '..', '..', 'src'),
    react: path.resolve(__dirname, '..', 'node_modules', 'react'),
  };

  baseConfig.plugins = [
    new HappyPack({
      id: 'ts',
      threads: 2,
      loaders: [
        {
          path: 'ts-loader',
          query: { happyPackMode: true },
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json')
          }
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      workers: 2,
      async: false,
      tslint: path.resolve(__dirname, '..', 'tslint.json')
    })
  ].concat((baseConfig.plugins || []));

  return baseConfig;
};

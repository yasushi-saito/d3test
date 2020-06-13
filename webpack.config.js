// To invoke webpack:
//
var path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  return {
    mode: 'development',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'app.bundle.js'
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    devtool: 'source-map',
    entry: ['./src/index.tsx'],
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              query: {
                modules: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'index.html', to: 'index.html' },
        ]
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      disableHostCheck: true,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    }
  };
};

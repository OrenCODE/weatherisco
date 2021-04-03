const webpack = require('webpack');
const path = require("path");

module.exports = {
  entry: './src/index.tsx',
  output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|svg|gif|ico|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[name][hash].[ext]',
        }
      },
    ],
  },
};
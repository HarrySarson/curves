require('extract-text-webpack-plugin');
const webpack = require('webpack');
const webpackSettings = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const optimizingPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new webpack.optimize.OccurrenceOrderPlugin,
  new webpack.optimize.UglifyJsPlugin,
  new HtmlWebpackPlugin({
    template: './src/index.ejs',
  }),
];

webpackSettings.plugins = [
  ...webpackSettings.plugins.filter((plugin) => plugin instanceof HtmlWebpackPlugin), 
  ...optimizingPlugins,
];
webpackSettings.entry = webpackSettings.entry.filter((entryName) => {
  return (entryName.indexOf('hot/dev-server') === -1);
});

module.exports = webpackSettings;

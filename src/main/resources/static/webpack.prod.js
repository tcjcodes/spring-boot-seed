var baseConfig = require('./webpack.base');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

/**
 * Webpack configuration for Production bundling.
 */
module.exports = Object.assign({}, baseConfig, {
    /**
     * To read more about the 'mode' property:
     * @see [webpack 4: mode and optimization]{@link https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a}
     */
    mode: 'production',

    /**
     * @see [Using source maps]{@link https://webpack.js.org/guides/development/#using-source-maps}
     * @see [devtool Docs]{@link https://webpack.js.org/configuration/devtool}
     */
    devtool: 'source-map', // Production-level source map

    output: Object.assign({}, baseConfig.output, {
        /**
         * Base path for all assets within the app
         */
        publicPath: '/static/app/',
    }),

    plugins: baseConfig.plugins.concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        /**
         * Automatically inserts webpack bundles into the template,
         * or generates HTML if `template` unspecified
         * @see [Webpack Docs]{@link https://webpack.js.org/plugins/html-webpack-plugin}
         */
        new HtmlWebpackPlugin({
            title: 'App',
            template: path.resolve(__dirname, 'index.html'),
            filename: 'index.html',
            hash: true
        }),
    ]),
});
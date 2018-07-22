var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.base');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack configuration for local development in DB mode (i.e. can run with Tomcat)
 * Extends prod configuration, but optimized for incremental builds.
 */
module.exports = Object.assign({}, baseConfig, {
    /**
     * To read more about the 'mode' property:
     * @see {@link https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a}
     */
    mode: 'development',

    // Optimize for local development (i.e. incremental builds)
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
    },

    plugins: baseConfig.plugins.concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),

        /**
         * Automatically inserts webpack bundles into the template,
         * or generates HTML if `template` unspecified
         * @see [Webpack Docs]{@link https://webpack.js.org/plugins/html-webpack-plugin}
         */
        new HtmlWebpackPlugin({
            title: 'App',
            template: path.resolve(__dirname, 'index.html'),
            hash: true
        }),
    ]),
}); // End config
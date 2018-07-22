var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * BASE webpack configuration for other environments to extend
 */
module.exports = {
    entry: {
        /**
         * Root of the app's dependency graph
         * @see {@link https://webpack.js.org/concepts/#entry}
         */
        app: path.resolve(__dirname, 'app/index.ts'),
    },

    output: {
        /**
         * Include comments in bundles with information about the contained modules
         * (Enabled by default in 'development' mode.)
         * @see [Docs]{@link https://webpack.js.org/configuration/output/#output-pathinfo}
         */
        pathinfo: false, // Disable to optimize build time
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        // filename: 'app-bundle.js'
    },

    /**
     * @see [Using source maps]{@link https://webpack.js.org/guides/development/#using-source-maps}
     * @see [devtool Docs]{@link https://webpack.js.org/configuration/devtool}
     */
    devtool: 'cheap-module-eval-source-map', // For development, faster on rebuild, slower on build

    devServer: {
        port: 8090,
        watchOptions: {
            ignored: [/node_modules/]
        },
        /**
         * Proxy requests from webpack-dev-server to Tomcat
         * @see [Webpack Docs]{@link https://webpack.js.org/configuration/dev-server/#devserver-proxy}
         * @see [Http Proxy Middleware]{@link https://github.com/chimurai/http-proxy-middleware#options} - used by devserver
         */
        proxy: [{
            /**
             * Any that match these should be passed through the proxy
             */
            context: ['/api'],
            target: 'http://localhost:' + 8080,
            logLevel: 'info',
        }],
    },

    resolve: {
        extensions: [
            '.ts', '.js'
        ]
    },

    module: {
        rules: [
            {
                /**
                 * Typescript loader works together with tsconfig.json
                 * @see {@link https://webpack.js.org/guides/typescript/#loader}
                 * @see {@link https://www.typescriptlang.org/docs/handbook/tsconfig-json.html}
                 */
                test: /\.(ts)?$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'ts-loader',
                    options: {
                        /**
                         * Speeds up TS builds
                         * @see {@link https://medium.com/@kenneth_chau/speeding-up-webpack-typescript-incremental-builds-by-7x-3912ba4c1d15}
                         */
                        transpileOnly: true,
                        experimentalWatchApi: true,
                    },
                }]
            },
            // For AngularJS
            // {
            //     test: /\.tpl\.html$/,
            //     use: [
            //         /**
            //          * Make these files available for use as ngTemplates,
            //          * e.g. `templateUrl` in components
            //          * @see {@link https://github.com/WearyMonkey/ngtemplate-loader}
            //          */
            //         'ngtemplate-loader?prefix=static/app/',
            //         'html-loader'
            //     ],
            //     exclude: [/node_modules/]
            // },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss|\.sass$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true, emitFile: false }
                    }]
                })
            },
            {
                /**
                 * Fonts
                 */
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            },
            {
                /**
                 * Fonts and images
                 */
                test: /\.(ttf|eot|svg|png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    { loader: 'file-loader' }
                ]
            },
            // {
            //     test: /\.json$/,
            //     use: [
            //         { loader: 'json-loader' }
            //     ]
            // }
        ]
    },
    plugins: [
        /**
         * Provide these as globals to every module (only meant for legacy modules)
         * E.g. <code>$</code> will map to the jquery module
         */
        // For AngularJS
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        // }),

        /**
         * Extracting CSS into a separate stylesheet instead of inlined in the JS bundle
         * @see {@link https://webpack.js.org/plugins/extract-text-webpack-plugin/}
         */
        new ExtractTextPlugin("bundle.css"),
    ]
};
// webpack.config.js
const glob = require('glob');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: [
        // entry files must be in order. `init.js` and `config.js` must be included before other js
        // see env config below for more detail
        ...glob.sync('./html/scripts/vendor/*.js'),
        ...glob.sync('./html/scripts/*(.js)!(init.js|vendor)'),
        ...glob.sync('./html/css/**/*.css'),
        ...glob.sync('./html/scss/all.scss'),
        ...glob.sync('./html/images/*'),
        ...glob.sync('./html/contents/*.html'),
        ...glob.sync('./html/index.html'),
    ],
    module: {
        rules: [
            {
                test: /index\.html$/,
                use: [
                    'file-loader?name=[name].[ext]',
                    'extract-loader',
                    {
                        loader: 'html-loader',
                        options: {
                            interpolate: true,
                        }
                    },
                ],
            },
            {
                test: /contents\/.*\.html$/,
                loader: 'file-loader',
                options: {
                    name: 'contents/[name].[ext]'
                }
            },
            {
                test: /\.ico$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /partials\/.*\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['script-loader', 'stripcomment-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                },
            },
        ]
    },
};

if (process.env.NODE_ENV === 'development') {
    module.exports = {
        ...module.exports,
        mode: 'development',
        plugins: [
            new CompressionPlugin(),
        ],
        entry: [
            './html/scripts/init.js',
            './html/config/dev.config.js',
            ...module.exports.entry,
        ],
        output: {
            path: path.join(__dirname, 'dist-dev'),
            publicPath: '/',
                filename: 'bundle.js'
        },
    };
}

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        ...module.exports,
        mode: 'production',
        // We are using cloudfront for compression
        entry: [
            './html/scripts/init.js',
            './html/config/prod.config.js',
            ...module.exports.entry,
        ],
        output: {
            path: path.join(__dirname, 'dist-prod'),
            publicPath: '/',
                filename: 'bundle.js'
        },
    };
}

const webpack = require('webpack');
const path = require('path');

/*
    mode: 'development',
    devtool: 'inline-source-map'
*/
/*
    mode: 'production'
*/
module.exports = {
    entry: ['babel-polyfill', 'whatwg-fetch', './src/app.js'],
    output: {
        path: path.resolve(__dirname, 'static/js'),
        publicPath: '/static/js/',
        filename: 'kiosk.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname)
                ],
                exclude: /(node_modules)|(static)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-syntax-object-rest-spread',
                            '@babel/plugin-transform-spread'
                        ]
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: [__dirname, path.join(__dirname, '/static/')],
        inline: true,
        hot: true,
        host: "localhost",
        port: 8000,
        historyApiFallback: {
             rewrites: [
                { from: /^\/$/, to: '/kiosk.html' }
            ]
        },
        proxy: {
            '/api': {
                target: "/",
                changeOrigin: false,
            }
        }
    },
    mode: 'production'
};
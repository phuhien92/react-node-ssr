const webpack = require('webpack');

module.exports = {
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    chunks: 'initial',
                    name: 'bundle',
                    filename: process.env.NODE_ENV === 'dev' ? '[name].js' : '[name].[hash].js',
                    priority: -20,
                    reuseExistingChunk: true,
                },
                commons: {
                    name: "commons",
                    filename: process.env.NODE_ENV === 'dev' ? '[name].js' : '[name].[hash].js',
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/
                },
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    filename: process.env.NODE_ENV === 'dev' ? '[name].js' : '[name].[hash].js',
                    priority: -10,
                    test: /node_modules\/(.*)\.js/
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    // Tell webpack to run babel on every file it runs through 
    module: {
        rules: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: [
                    'react',
                    'stage-0', ['env', {
                        targets: {
                            browser: ['last 2 versions']
                        }
                    }]
                ]
            }
        }]
    }
}
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const config = {
    // Tell webpack the root file of out server app
    entry: './src/client/client.js',

    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    }

    // // Tell webpack to run babel on every file it runs through 
    // module: {
    //     rules: [
    //         {
    //             test: /\.js?$/,
    //             loader: 'babel-loader',
    //             exclude: /node_modules/,
    //             options: {
    //                 presets: [
    //                     'react',
    //                     'stage-0',
    //                     ['env', {targets: { browser: ['last 2 versions']}}]
    //                 ]
    //             }
    //         }
    //     ]
    // }
};

module.exports = merge(baseConfig, config);
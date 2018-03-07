const path          = require('path');
const merge         = require('webpack-merge');
const baseConfig    = require('./webpack.base.js');
const webpack       = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');
const config = {
    // Inform webpack that we are bulding a bundle 
    // for nodeJS, rather than for the browser
    target: 'node',

    // Tell webpack the root file of out server app
    // entry: {
    //     index: './src/index.js'   
    // },
    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: '[name].chunk.js',
        path: path.resolve(__dirname, 'build')
    },

    externals: [webpackNodeExternals()]

    // Tell webpack to run babel on every file it runs through 
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
/* eslint-disable */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let babelLoader = { loader: 'babel-loader' };

let tsLoader = {
    loader: 'ts-loader',
    options: { 
        transpileOnly: true,
    },
}

let htmlLoader = { loader: 'html-loader' };
let sassLoader = { loader: 'sass-loader' };
let cssLoader = { loader: 'css-loader', options: { modules: true } };
let cssModulesTyescriptLoader = { loader: 'css-modules-typescript-loader' };
let styleLoader = { loader: 'style-loader' };

module.exports = {
    devtool: "source-map",
    entry: "./src/app.tsx",
    output: {
        filename: "app.bundle.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        plugins: [
            new TsconfigPathsPlugin(),
        ],
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: [ babelLoader, tsLoader ] }, 
            { test: /\.html$/, use: [ htmlLoader ] },
            { test: /\.s[ac]ss/, use: [ styleLoader, /*cssModulesTyescriptLoader,*/ cssLoader, sassLoader ] },
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                sourceMap: true,
            }),
        ],
    },
};
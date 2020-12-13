const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const env = process.env.NODE_ENV;
const devMode = process.env.NODE_ENV !== "production";

const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: "src/index.html",
    }),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
    }),
   /* new CopyWebpackPlugin({
        patterns: [
            {from: "src/assets", to: "assets"},
        ],
    }),*/
];
if (devMode) {
    // only enable hot in development
    plugins.push(new webpack.HotModuleReplacementPlugin());
}
if (devMode) {
    plugins.push(new CleanWebpackPlugin());
}

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "[name].[contenthash].js",
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "/src"),
        port: 8008,
        watchContentBase: true,
        compress: true,
        open: "Google Chrome",
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "",
                        },
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: "image-webpack-loader",
                // Specify enforce: 'pre' to apply the loader
                // before url-loader/svg-url-loader
                // and not duplicate it in rules with them
                enforce: "pre",
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                exclude: /node_modules/,
                use: {
                    loader: "file-loader",
                    options: {
                        // Images larger than 10 KB won’t be inlined
                        limit: 10 * 1024,
                    },
                },
            },
            {
                test: /\.svg/,
                exclude: /node_modules/,
                use: {
                    loader: "svg-url-loader",
                    options: {
                        // Images larger than 10 KB won’t be inlined
                        limit: 10 * 1024,
                        // Remove quotes around the encoded URL –
                        // they’re rarely useful
                        noquotes: true,
                    },
                },
            },
        ],
    },
    plugins,
};
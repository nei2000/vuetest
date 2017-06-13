var path = require('path');

var distPath = path.join(__dirname, 'public');
var srcPath = path.join(__dirname, 'web');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: path.join(srcPath, 'app.js')
    },
    output: {
        path: distPath,
        publicPath: '',
        //filename: "js/[name]-[chunkhash].js"
        filename: "js/[name].js",
        chunkFilename:'js/lib/[id].build.js?[chunkhash]'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')]
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: srcPath,
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.(css|sass)$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(svg|woff2?|eot|ttf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(png|jpg|gif)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 100,
                    name: 'img/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            minChunks : Infinity
        }),
        new webpack.DefinePlugin({
            "require.specified": "require.resolve"
        }),
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'template/index.html')
        })
    ]
};
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

// console.log(path.join(__dirname, "/client/src/js"));

module.exports = {
    context: path.join(__dirname, "/client/src/js"),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./app.js",
    module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0']
            }
          }
        ]
    },
    output: {
        path: __dirname + "/client/build/js",
        filename: "app.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};
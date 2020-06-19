const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // webpack will take the files from ./src/index
    entry: './src/index',

    // and output it into /dist as bundle.js
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash].js',
        publicPath: '/'
    },

    devServer:{
        // This serves the static content not from webpack i.e. from given directory
        contentBase: path.resolve(__dirname, 'public')
    },
    
    devtool: "inline-source-map",

    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
        rules: [
            // we use babel-loader to load our jsx and tsx files
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },

            // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            // file-loader to make images importable
            {
                test: /\.(png|jpg|gif)$/i,
                use: ['file-loader']
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: true,

        }),
    ],
};

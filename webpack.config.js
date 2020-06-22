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
		contentBase: path.resolve(__dirname, 'public'),
		overlay: true
    },
    
    devtool: "inline-source-map",

    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
		// Note: order matters here as well
		extensions: ['.ts', '.tsx', '.js', '.jsx'], 
    },

    module: {
        rules: [
            // we use babel-loader to load our jsx and tsx file
			// https://stackoverflow.com/questions/49624202/why-use-babel-loader-with-ts-loader
			{
				test: /\.tsx?$/,
				// Note: using include is more maintainable and efficient.
				include: [path.resolve(__dirname, 'src'), /vmmx-schema/],
				use: [
					{
                        // First use babel loader(with typescript preset) to transpile latest features (without typechecking)
						loader: 'babel-loader',
						options: {
							// https://webpack.js.org/loaders/babel-loader/#babel-loader-is-slow
							cacheDirectory: true
						}
					},
					{
						// type check the output from the previous loader
						loader: 'ts-loader',
						options: {
							// for re-compiling .ts files in vmmx-schema
							"allowTsInNodeModules": true
						}
					}
				]
			}, 
			{
				test: /\.jsx?$/,
				include: [path.resolve(__dirname, 'src')],
				use: [
					{
						loader: 'babel-loader',
					}
				]
			},

			// css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
			{
				test: /\.css$/,
				include: [path.resolve(__dirname, 'src'), /node_modules/],
				use: ['style-loader', 'css-loader'],
			},
			// file-loader to make images importable
			{
				test: /\.(png|jpg|gif)$/i,
				include: [path.resolve(__dirname, 'src')],
				use: ['file-loader']
			},
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: true,

        }),
    ],
};

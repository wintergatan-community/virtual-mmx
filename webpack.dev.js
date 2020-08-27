// The development specific configuration
const path = require("path");

module.exports = {
	mode: 'development',

	devtool: 'inline-source-map',

	devServer: {
		// This serves the static content not from webpack i.e. from given directory
		contentBase: path.resolve(__dirname, "public"),
		overlay: true,
	}
};
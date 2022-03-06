const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "production", // "production" | "development" | "none"
	// Chosen mode tells webpack to use its built-in optimizations accordingly.
	entry: "./src/index.js", // string | object | array
	output: {
		// options related to how webpack emits results
		path: path.resolve(__dirname, "extension"), // string (default)
		// the target directory for all output files
		// must be an absolute path (use the Node.js path module)
		filename: "encrypt.js", // string (default)
	},
	optimization: {
		minimize: false,
		// minimizer: [
		// 	new TerserPlugin({
		// 		terserOptions: {
		// 			keep_classnames: true,
		// 			keep_fnames: true
		// 		}
		// 	})
		// ]
	},
}
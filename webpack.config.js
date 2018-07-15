var path = require("path");

module.exports = {
	entry: {
		index: "./index.tsx"
	},

	output: {
		filename: "bundle/[name].js",
		path: __dirname + ""
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "source-map-loader"
			},
			{
				test: /\.jsx?$/,
				loader: "source-map-loader"
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "ts-loader"
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},

	mode: "development",
	devtool: "source-map"
};

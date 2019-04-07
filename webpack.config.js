const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		app: "./src/index.jsx"
	},
	output: {
		filename: "[name].[hash].js",
		path: path.resolve(__dirname, "dist")
	},
	module: {
		rules: [{
			test: /\.(css|scss)$/,
			use: ["style-loader", "css-loader", "sass-loader"]
		},{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: ["babel-loader"]
		}]
	},
	devtool: "cheap-module-eval-source-map",
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		hot: true
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "React Single Page Application",
			template: "./src/index.html",
			filename: "index.html"
		}),
		new webpack.HotModuleReplacementPlugin()

	],
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			chunks: "all"
		}
	}
};


var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

// paths determine
const clientAppShared = helpers.root('ClientApp');
const clientAppSharedApp = helpers.root('ClientApp', 'app');

module.exports = {
	entry: {
		//'polyfills': './ClientApp/polyfills.ts',
		//'vendor': './ClientApp/vendor.ts',
		'app': ['./ClientApp/polyfills.ts', './ClientApp/main.ts', './ClientApp/vendor.ts'],
	},

	resolve: {
		extensions: ['', '.ts', '.js']
	},

	module: {
		loaders: [
			// angular2 typescript loader
			{
				test: /\.ts$/,
				include: [clientAppShared],
				loaders: ['awesome-typescript-loader?doTypeCheck=false&useBabel=true&useWebpackText=true ', 'angular2-template-loader', 'angular2-router-loader']
			},
			// html loader
			{
				test: /\.html$/,
				loader: 'raw',
				include: [clientAppShared]
			},
			// static assets
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				include: [clientAppShared],
				loader: 'file?name=assets/[name].[hash].[ext]'
			},
			// css loader and inject into components
			{
				test: /\.css$/,
				include: [clientAppSharedApp],
				loader: ['raw-loader']
			},
			// css global which not include in components
			{
				test: /\.css$/,
				include: [clientAppShared],
				exclude: [clientAppSharedApp],
				loader: [ExtractTextPlugin.extract('raw-loader')]
			},
			// SASS loader and inject into components      
			{
				test: /\.scss$/,
				include: [clientAppSharedApp],
				loaders: ['raw-loader', 'sass-loader']
			},
			// SASS global which not include in components
			{
				test: /\.scss$/,
				include: [clientAppShared],
				exclude: [clientAppSharedApp],
				loader: ExtractTextPlugin.extract(['raw-loader', 'sass-loader'])
			}
		]
	},

	plugins: [
		//new webpack.optimize.CommonsChunkPlugin({
		//    name: ['app', 'vendor', 'polyfills']
		//}),

		new HtmlWebpackPlugin({
			template: `ClientApp/_LayoutTemplate.cshtml`,
			filename: '../Views/Shared/_Layout.cshtml',
			// excludeChunks: ['widget']
		}),

		new CopyWebpackPlugin([
			{ from: `ClientApp/assets`, to: 'assets' },
			{ from: `ClientApp/manifest.json`, to: 'manifest.json' }
		]),

		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery'
		})
	]
};

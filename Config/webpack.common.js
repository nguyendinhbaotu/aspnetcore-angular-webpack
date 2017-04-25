var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
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
		extensions: ['*', '.ts', '.js']
	},

	module: {
		rules: [
			// angular2 typescript loader
			{
				test: /\.ts$/,
				include: [clientAppShared],
				loaders: ['awesome-typescript-loader?doTypeCheck=false&useBabel=true&useWebpackText=true ', 'angular2-template-loader', 'angular2-router-loader']
			},
			// html loader
			{
				test: /\.html$/,
				loader: 'raw-loader',
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
				include: [clientAppSharedApp],
				loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader']})
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
				loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader']})
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
		}),

		new CopyWebpackPlugin([
			{ from: `ClientApp/assets`, to: 'assets' },
			{ from: `ClientApp/manifest.json`, to: 'manifest.json' }
		]),

		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery'
		}),

		// Tslint configuration for webpack 2
		new webpack.LoaderOptionsPlugin({
			options: {
				/**
				 * Apply the tslint loader as pre/postLoader
				 * Reference: https://github.com/wbuchwalter/tslint-loader
				 */
				tslint: {
				emitErrors: false,
				failOnHint: false
				},
				/**
				 * Sass
				 * Reference: https://github.com/jtangelder/sass-loader
				 * Transforms .scss files to .css
				 */
				sassLoader: {
				//includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
				},
				/**
				 * PostCSS
				 * Reference: https://github.com/postcss/autoprefixer-core
				 * Add vendor prefixes to your css
				 */
				postcss: [
					autoprefixer({
						browsers: ['last 2 version']
					})
				]
			}
		}),

		// Extract css files
		// Reference: https://github.com/webpack/extract-text-webpack-plugin
		// Disabled when in test mode or not in build mode
		new ExtractTextPlugin({filename: 'css/[name].[hash].css'})
	]
};

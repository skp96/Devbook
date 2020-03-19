const path = require('path');

module.exports = {
	context: __dirname,
	entry: './client/src/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.css', '*' ]  
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					query: {
						presets: [ '@babel/env', '@babel/react' ]
					}
				}
			}, 
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      	loader: 'url-loader?limit=100000',
			},
		]
	},
	node: {
		fs: 'empty'
	},
	devtool: 'eval-source-map',
	stats: {
		warnings: false
	}
};

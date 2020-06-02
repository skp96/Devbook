const path = require('path');

module.exports = {
	context: __dirname,
	entry: './client/src/index.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.css', '*' ],
		modules:['node_modules']
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
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      	loader: 'url-loader?limit=100000',
			},
			{
				test: /\.mp4$/,
				use: 'file-loader?name=videos/[name].[ext]'
			}
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

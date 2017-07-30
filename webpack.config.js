const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    index: path.resolve(srcDir, 'index.js')
  },
  devtool: '#inline-source-map',
  devServer: {
    contentBase: distDir,
    host: "0.0.0.0",
    disableHostCheck: true,
    port: 3000
  },
  plugins: [
    new CleanWebpackPlugin(distDir),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'webpack.index.template.html')
    })
  ],
  output: {
    filename: '[name].[hash].bundle.js',
    path: distDir
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}

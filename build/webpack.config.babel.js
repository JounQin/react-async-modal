import path from 'path'

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import pkg from '../package.json'

const resolve = (...args) => path.resolve(__dirname, '..', ...args)

const NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = NODE_ENV === 'production'

const entry = {
  app: [resolve('src/index.js')],
  vendors: ['react', 'react-dom']
}

if (!isProd) {
  entry.app.unshift('react-hot-loader/patch')
}

export default {
  entry,
  output: {
    path: resolve('docs'),
    filename: `[name].[${isProd ? 'chunkhash' : 'hash'}].js`
  },
  devtool: !isProd && 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {cacheDirectory: true}
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: `${pkg.name} - ${pkg.description}`
    }),
    ...(isProd
      ? [
          new webpack.optimize.ModuleConcatenationPlugin(),
          new webpack.optimize.CommonsChunkPlugin('vendors'),
          new webpack.optimize.CommonsChunkPlugin('manifest')
        ]
      : [new webpack.NamedModulesPlugin()])
  ]
}

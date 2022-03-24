const path = require('path');

module.exports = {
  context: __dirname,
  entry: './frontend/meet_greet.tsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*', '.tsx', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react', '@babel/typescript']
          }
        },      
      },
    
    ]
  },
  devtool: 'source-map'
};
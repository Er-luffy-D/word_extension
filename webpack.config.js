const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production', // Change to 'development' during development
  entry: './src/index.js', // Entry point of your extension
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output bundle name
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile modern JavaScript for compatibility
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Process CSS files
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css', // Extracted CSS file name
    }),
  ],
  resolve: {
    extensions: ['.js', '.css'],
  },
  devtool: 'source-map', // Generate source maps for debugging
};

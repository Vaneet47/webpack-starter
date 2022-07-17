const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // doew some optimizations but doesn't shrink our code
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "",
  },
  devtool: "eval-cheap-module-source-map", // controls how source maps are generated
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              /// helps with css modules
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: () => [autoprefixer()],
              },
            },
          }, // automatically prefixes css code
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/, //// testing for image files
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000,
              name: "images/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
};

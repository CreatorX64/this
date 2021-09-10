const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/playground/03-redux-expensify.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: path.join(__dirname, "public"),
    historyApiFallback: true
  }
};

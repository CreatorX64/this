const path = require("path");

module.exports =
{
  entry:
  {
    index: ["core-js/stable", "regenerator-runtime/runtime", "./src/index.js"],
    edit: ["core-js/stable", "regenerator-runtime/runtime", "./src/edit.js"]
  },
  output:
  {
    path: path.resolve(__dirname, "public", "scripts"),
    filename: "[name]-bundle.js"
  },
  module:
  {
    rules:
    [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use:
        {
          loader: "babel-loader",
          options:
          {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  devServer:
  {
    contentBase: path.resolve(__dirname, "public"),
    publicPath: "/scripts/"
  },
  devtool: "source-map"
};
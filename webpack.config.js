const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main/index.tsx",
  output: {
    path: path.join(__dirname, "public/js"),
    publicPath: "public/js",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@data": path.join(__dirname, "src", "data"),
      "@domain": path.join(__dirname, "src", "domain"),
      "@infra": path.join(__dirname, "src", "ingra"),
      "@main": path.join(__dirname, "src", "main"),
    },
  },
  devServer: {
    contentBase: "./public",
    devMiddleware: {
      writeToDisk: true,
    },
    historyApiFallback: true,
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugin: [new CleanWebpackPlugin()],
};

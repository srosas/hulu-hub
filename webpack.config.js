const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "" }, // index.html
        { from: "src/tile/tile.html", to: "tile/tile.html" },
        { from: "src/row/row.html", to: "row/row.html" },
        { from: "src/modal/modal.html", to: "modal/modal.html" },
        { from: "src/img/fallback.png", to: "img/fallback.png" },
      ],
    }),
  ],
  devServer: {
    static: "./dist",
    hot: true,
    port: 3000,
  },
};

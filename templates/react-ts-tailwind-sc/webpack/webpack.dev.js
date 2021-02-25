const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const path = require("./path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.outputDir,
    port: 9000,
    compress: true,
    historyApiFallback: true,
    proxy: {
      context: ["/api", "/auth"],
      target: "http://localhost:4000",
    },
    hot: true,
  },
  plugins: [
    new BundleAnalyzerPlugin({ analyzerPort: 8888, openAnalyzer: false }),
    new ReactRefreshWebpackPlugin(),
  ],
};

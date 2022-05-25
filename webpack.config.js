const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ANALYZE = process.env.ANALYZE;

const config = {
  mode: "production",
  entry: "./src/app.jsx",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React",
      template: "./index.html",
    }),
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ["*.LICENSE.txt"] }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        framework: {
          filename: "framework.[hash].js",
          chunks: "all",
          priority: 40,
          test: /.*\/node_modules\/(react|react-dom|scheduler)\/.*/,
          enforce: true,
        },
      },
    },
  },
};

if (ANALYZE) {
  const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;

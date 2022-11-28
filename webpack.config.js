const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ANALYZE = process.env.ANALYZE;
const PORT = parseInt(process.env.PORT || '3000');
const isProd = process.env.NODE_ENV === 'production'

const config = {
  mode: isProd ? 'production' : 'development',
  entry: "./src/app.jsx",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
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

if (!isProd) {
  config['devServer'] = {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: false,
    port: PORT,
    hot: true,
    client: {
      progress: true,
    },
  }
}

if (ANALYZE) {
  const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;

const path = require("path");
const root = path.resolve(__dirname, "..");
const pak = require("../package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  cache: false,
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[contenthash].bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      [pak.name.replace(/^(@nebulr-group\/)/, "")]: path.join(
        __dirname,
        "..",
        pak.source
      ),
    },
  },
  devServer: {
    host: "localhost",
    static: "public/",
    historyApiFallback: true,
    liveReload: true,
    open: false,
    hot: true,
    historyApiFallback: true,
  },
  target: "web",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(root, "src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      {
        test: /\.([cm]?ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/i,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "public"),
          path.resolve(root, "src"),
        ],
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      inject: "body",
    }),
  ],
};

module.exports = config;

const path = require("path");
const root = path.resolve(__dirname, "..");
const pak = require("../package.json");

console.log(path.join(__dirname, "..", pak.source));
console.log([pak.name.replace(/^(@nebulr-group\/)/, "")]);
const config = {
  mode: "development",
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
  mode: "development",
  entry: "./src/index.tsx",
  devServer: {
    static: "./public",
  },
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
              plugins: ["module-resolver"],
            },
          },
        ],
      },
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader",
      },
    ],
  },
};

module.exports = config;

// Node core module 'path'
const path = require("path");
// Importing package.json from the repo root dir
const pak = require("../package.json");

module.exports = function (api) {
  // Babel caching API, Doc reference: https://babeljs.io/docs/en/config-files#apicache
  // Permacache the computed config and never call the function again.
  api.cache(false);

  // Configuration
  return {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
          alias: {
            // For development, we want to alias the library to the source
            [pak.name.replace(/^(@nebulr-group\/)/, "")]: path.join(
              __dirname,
              "..",
              pak.source
            ),
          },
        },
      ],
    ],
  };
};

const pak = require("./package.json");

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "auto",
        targets: {
          chrome: "107",
          edge: "15",
          safari: "10",
          firefox: "54",
          opera: "64",
          samsung: "5",
          android: "13.4",
        },
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};

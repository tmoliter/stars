const path = require("path");
module.exports = {
  entry: "./graph.js",
  output: {
    path: path.resolve("dist"),
    filename: "webpackoutput.js",
  },
};

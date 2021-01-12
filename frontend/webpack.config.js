const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/graph.js",
  output: {
    path: path.resolve("dist"),
    filename: "../../backend/dist/webpackoutput.js",
  },
};

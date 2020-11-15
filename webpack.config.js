const path = require("path");

module.exports = {
  entry: [
    "./js/utils.js",
    "./js/move.js",
    "./js/data.js",
    "./js/server.js",
    "./js/mapmodule.js",
    "./js/debounce.js",
    "./js/filters.js",
    "./js/form.js",
    "./js/photos.js",
    "./js/card.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};

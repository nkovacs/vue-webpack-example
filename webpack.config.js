module.exports = {
  entry: "./src/main.js",
  output: {
    path: "./build",
    publicPath: "/vue-webpack-example/build/",
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.styl$/, loader: "style!css!stylus" },
      { test: /\.html$/, loader: "html" }
    ]
  }
}

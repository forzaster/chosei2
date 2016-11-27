module.exports = {
  entry: "./src/app.js",
  output: {
    path: "./out",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
       query: {plugins: ["transform-react-jsx"]}}
    ]
  }
};
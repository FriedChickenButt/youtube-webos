const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => [
  {
    mode: env.production ? 'production' : 'development',

    target: 'es5',

    // Builds with devtool support (development) contain very big eval chunks,
    // which seem to cause segfaults (at least) on nodeJS v0.12.2 used on webOS 3.x.
    // This feature makes sense only when using recent enough chrome-based
    // node inspector anyway.
    devtool: false,

    entry: {
      index: './src/index.js',
      userScript: './src/userScript.js',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: ({ chunk: { name } }) => (name === 'userScript') ? 'webOSUserScripts/[name].js' : '[name].js',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { context: 'assets', from: '**/*' },
          { context: 'src', from: 'index.html' },
          { context: 'src', from: 'index.css' },
          { context: 'src', from: 'video.mp4' },
        ]
      }),
    ],
  },
];

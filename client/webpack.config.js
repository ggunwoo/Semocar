const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const dotenv = require("dotenv");
const webpack = require("webpack");

dotenv.config();

module.exports = {
  mode: "development",
  name: "semocar",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"), // 출력 디렉토리
    filename: "bundle.[contenthash].js", // 출력 할 파일 이름
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // 확장자 처리 파일
    alias: {
      "@mui/material": "@mui/material/legacy",
      "@mui/styled-engine": "@mui/styled-engine/legacy",
      "@mui/system": "@mui/system/legacy",
      "@mui/base": "@mui/base/legacy",
      "@mui/utils": "@mui/utils/legacy",
      "@mui/lab": "@mui/lab/legacy",
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .tsx ES5 처리
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/, // scss 파일 처리
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["./src/styles"],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // 이미지 파일 처리
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      publicPath: "/",
    }),
    new FaviconsWebpackPlugin({
      logo: "./public/logo-512x512.png",
      manifest: "./public/manifest.json",
    }),
    new webpack.DefinePlugin({
      "process.env.SERVER_URL": JSON.stringify(process.env.SERVER_URL),
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  stats: {
    errorDetails: true,
  },
  devtool: "eval-source-map", // 개발 환경
};

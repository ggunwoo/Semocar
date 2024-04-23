import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

module.exports = {
  mode: "development",
  name: "semocar",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"), // 출력 디렉토리
    filename: "bundle.js", // 출력 할 파일 이름
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
        test: /\.tsx?$/, // .ts와 .tsx ES5 처리
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // css 파일 처리
        use: ["style-loader", "css-loader"],
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
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
  },
};

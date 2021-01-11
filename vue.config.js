module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      less: {
        // 这里的选项会传递给 css-loader
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    // proxy: {
    //   "/api": {
    //     // target: "http://localhost:808",
    //     target:
    //       "https://www.fastmock.site/mock/db1c3d45ccc1f3960d8b83fc819e05e8/_ipd-mock",
    //     changeOrigin: true
    //     // pathRewrite: {
    //     //   "^/api": "/mock"
    //     // }
    //   }
    // }
  }
};

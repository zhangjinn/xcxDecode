module.exports = {
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: false,
  // css的处理
  css: {
    // 向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
      css: {},
      less: {}
    }
  },

  // 所有 webpack-dev-server 的选项都支持
  devServer: {},

  // 可以用来传递任何第三方插件选项
  pluginOptions: {}
}

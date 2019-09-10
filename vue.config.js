const baseUrl = process.env.NODE_ENV === 'production' ? '/gsbx' : '/gsbx'

module.exports = {
  publicPath: baseUrl,
  runtimeCompiler: true,
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  lintOnSave: false,
  devServer: {
    port: 9256,
    publicPath: baseUrl, // 和 baseUrl 保持一致
    disableHostCheck: true
  }
}

module.exports = {
    chainWebpack: config => {
      // JSON5 Loader
      config.module
        .rule('json5')
        .test(/\.json5$/)
        .use('json5-loader')
        .loader('json5-loader')
        .end();
    }
  };
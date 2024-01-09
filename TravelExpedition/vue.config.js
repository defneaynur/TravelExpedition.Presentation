const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  devServer:{
    port:8091,
    proxy: {
      '^/users': {
        target: 'https://localhost:7092/',
        ws: true,
        changeOrigin: true
      },
    }
  },
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },
});

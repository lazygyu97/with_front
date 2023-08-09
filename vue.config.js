const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    // proxy: {
    //   '/': {
    //     "target": 'http://localhost:9090/',
    //     "pathRewrite": { '^/': '' },
    //     "changeOrigin": true,
    //     "secure": false,
    //     "ws":false
    //   }
    // }
  }
})

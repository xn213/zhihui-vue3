module.exports = {
  publicPath: '',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

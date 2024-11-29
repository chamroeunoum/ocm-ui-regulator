export default {
  install(app, options = {}) {
    app.config.globalProperties.$assets = ( pathToFile ) => {
      return new URL('./../assets/'+pathToFile, import.meta.url).pathname
    }
  }
}
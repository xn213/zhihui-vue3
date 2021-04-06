import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://apis.xn213.com/api/'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: 'icodericodericoder' }
  return config
})
// axios.get('http://api.xn213.com/api/column').then(res => {
// axios.get('/columns?icode=icodericodericoder').then(res => {
axios.get('/columns').then(res => {
  console.log('res', res.data)
})
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

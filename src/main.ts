import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://apis.xn213.com/api/'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: 'icodericodericoder' }
  store.commit('setLoading', true)
  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
})
// axios.get('http://api.xn213.com/api/column').then(res => {
// axios.get('/columns?icode=icodericodericoder').then(res => {
axios.get('/columns').then(res => {
  console.log('res', res.data)
})

/************* ↓↓ 'test async await' by xn213 *************/
async function hello () {
  // return 'hello async'
  const greeting = await Promise.resolve('Hello')
  return greeting
}
console.log('hello()', hello())
console.log('async -> hello()', hello()) // Promise
hello().then(value => {
  console.log('hello().then', value) // hello
})

/************* ↑↑ 'test async await' by xn213 *************/

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

import { createRouter, createWebHistory } from 'vue-router'

import store from './store'
import axios from 'axios'

import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import CreatePost from './pages/CreatePost.vue'
import ColumnDetail from './components/ColumnDetail.vue'
import PostDetail from './pages/PostDetail.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { redirectAlreadyLogin: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/createpost',
    name: 'CreatePost',
    component: CreatePost,
    meta: { requiredLogin: true }
  },
  {
    path: '/column/:id',
    name: 'column',
    component: ColumnDetail
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: PostDetail
  }
]

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes
})
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta

  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.error(e)
        store.commit('logout')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router

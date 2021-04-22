import { createRouter, createWebHistory } from 'vue-router'

import store from './store'

import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import CreatePost from './pages/CreatePost.vue'
import ColumnDetail from './components/ColumnDetail.vue'
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
  }
]

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes
})
router.beforeEach((to, from, next) => {
  // console.log('to.meta: ', to.meta)

  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router

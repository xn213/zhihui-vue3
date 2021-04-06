import { createRouter, createWebHistory } from 'vue-router'

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
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/create',
    name: 'CreatePost',
    component: CreatePost
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

export default router

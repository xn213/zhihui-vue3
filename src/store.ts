import axios from 'axios'
import { Commit, createStore } from 'vuex'
import { testData, testPosts } from './const/testData'

export interface ResponseType<P = {}> { // eslint-disable-line
  code: number;
  msg: string;
  data: P;
}

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt: string;
  column: string;
  author?: string;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
  return data
}

const postAndCommit = async (url: string, mutationName: string, payload: any, commit: Commit) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: true,
    columns: testData,
    // posts: testPosts,
    posts: [],
    user: { isLogin: false }
  },
  mutations: {
    createUser (state, rawData) {
      state.user = rawData.data
    },
    // test login
    // login (state) {
    //   state.user = { ...state.user, isLogin: true, name: 'xn213' }
    // },
    login (state, rawData) {
      const { token } = rawData.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    logout (state) {
      state.token = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    },
    fetchCurrentUser (state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    }
  },
  actions: {
    async createUser ({ commit }, payload) {
      return postAndCommit('/api/users', 'createUser', payload, commit)
    },

    createPost ({ commit }, payload) {
      return postAndCommit('/api/posts', 'createPost', payload, commit)
    },

    login ({ commit }, payload) {
      return postAndCommit('/api/user/login', 'login', payload, commit)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    fetchCurrentUser ({ commit }) {
      return getAndCommit('/api/user/current', 'fetchCurrentUser', commit)
    },

    async fetchColumns ({ commit }) {
      return getAndCommit('/api/columns', 'fetchColumns', commit)

      // const { data } = await axios.get('/columns')
      // commit('fetchColumns', data)

      // axios.get('/columns').then(res => {
      //   context.commit('fetchColumns', res.data)
      // })
    },
    async fetchColumn ({ commit }, cid) {
      return getAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)

      // const { data } = await axios.get(`/columns/${cid}`)
      // commit('fetchColumn', data)

      // axios.get(`/columns/${cid}`).then(res => {
      //   commit('fetchColumn', res.data)
      // })
    },
    async fetchPosts ({ commit }, cid) {
      return getAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit)

      // const { data } = await axios.get(`/columns/${cid}`)
      // commit('fetchPosts', data)

      // axios.get(`/columns/${cid}/posts`).then(res => {
      //   commit('fetchPosts', res.data)
      // })
    }
  },
  getters: {
    // biggerColumnLen (state) {
    //   return state.columns.filter(c => c._id === '2').length
    // },
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  }
})

export default store

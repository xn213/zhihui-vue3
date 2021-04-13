import axios from 'axios'
import { Commit, createStore } from 'vuex'
import { testData, testPosts } from './const/testData'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId: number;
}

interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
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
  image?: ImageProps;
  createdAt: string;
  column: string;
}


export interface GlobalDataProps {
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  commit('setLoading', true)
  const  { data } = await axios.get(url)
  await new Promise(resolve => setTimeout(resolve, 2000)) // 模拟
  commit(mutationName, data)
  commit('setLoading', false)
}
const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: testData,
    // posts: testPosts,
    posts: [],
    user: { isLogin: true, name: 'xn213', columnId: 1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'xn213' }
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
    }
  },
  actions: {
    async fetchColumns ({ commit }) {
      getAndCommit('/columns', 'fetchColumns', commit)

      // const { data } = await axios.get('/columns')
      // commit('fetchColumns', data)

      // axios.get('/columns').then(res => {
      //   context.commit('fetchColumns', res.data)
      // })
    },
    async fetchColumn ({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)

      // const { data } = await axios.get(`/columns/${cid}`)
      // commit('fetchColumn', data)

      // axios.get(`/columns/${cid}`).then(res => {
      //   commit('fetchColumn', res.data)
      // })
    },
    async fetchPosts ({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)

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

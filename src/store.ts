import axios from 'axios'
import { createStore } from 'vuex'
import { PostProps, testData, testPosts } from './const/testData'

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

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
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
    }
  },
  actions: {
    fetchColumns (context) {
      axios.get('/columns').then(res => {
        context.commit('fetchColumns', res.data)
      })
    }
  },
  getters: {
    biggerColumnLen (state) {
      return state.columns.filter(c => c._id === '2').length
    },
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})

export default store

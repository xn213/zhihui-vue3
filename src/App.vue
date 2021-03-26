<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

const testUser: UserProps = {
  id: 213,
  name: 'xn213',
  isLogin: true
}
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1的专栏， 非常值得学习',
    avatar: 'https://cdn.jsdelivr.net/gh/xn213/img-hosting@master/imgs/xn.mgi4zyfqels.png'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是test2的专栏， 非常值得学习',
    avatar: 'https://cdn.jsdelivr.net/gh/xn213/img-hosting@master/imgs/xn.mgi4zyfqels.png'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是test3的专栏， 非常值得学习'
    // avatar: 'https://cdn.jsdelivr.net/gh/xn213/img-hosting@master/imgs/xn.mgi4zyfqels.png'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是test4的专栏， 非常值得学习',
    avatar: 'https://cdn.jsdelivr.net/gh/xn213/img-hosting@master/imgs/xn.mgi4zyfqels.png'
  }
]
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader
  },
  setup () {
    return {
      list: testData,
      user: testUser
    }
  }
})
</script>

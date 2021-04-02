<template>
  <div class='home'>
    <column-list :list="list" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
// import { testData } from '../const/testData'
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columns)
    return {
      list
    }
  }
})
</script>

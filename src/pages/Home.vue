<template>
  <div class='home'>
    <column-list :list="testData" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import { testData } from '../const/testData'
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    return {
      testData
    }
  }
})
</script>

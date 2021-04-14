<template>
  <teleport to="#loading">
  <div class='d-flex justify-content-center align-items-center h-100 loading-container'
       :style="{backgroundColor: background || ''}">
    <div class="loading-content">
      <div class="spinner-border text-primary" role="status">
        <!-- sr-only 视觉障碍阅读网页设计的 -->
        <!-- <span class="sr-only">{{text || 'Loading...'}}</span> -->
      </div>
      <p class="text-center">{{text || ''}}</p>
    </div>
  </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
export default defineComponent({
  name: 'XLoading',
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup () {
    const node = document.createElement('div')
    node.id = 'loading'
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node)
    })
  }
})
</script>
<style>
.loading-container {
  width: 100%;
  height: 100;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(255, 255, 255, .5);
}
.loading-content {
  text-align: center;
}
</style>

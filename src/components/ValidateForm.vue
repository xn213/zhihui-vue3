<template>
  <div class="validate-form">
    <form class="validate-form-container">
      <slot name="default"></slot>
      <div class="submit-area" @click.prevent="submitForm">
        <slot name="submit">
          <button type="submit" class="btn btn-primary">提交</button>
        </slot>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import mitt from 'mitt'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    const submitForm = () => {
      context.emit('form-submit', 111)
    }
    return {
      submitForm
    }
  },
  mounted () {
    // this.$on('item-created', () => {
    //   // 这里用 vue2 的方法 $on $of $once但是提示已废弃 故探索vue3 方案， 引用外部库 mitt
    // })
  }
})
</script>

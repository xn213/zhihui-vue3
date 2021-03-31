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
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
export const emitter = mitt()
type ValidateFunc = () => boolean
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func)
      }
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
    })
    return {
      submitForm
    }
  }
  // mounted () {
  //   // this.$on('item-created', () => {
  //   //   // 这里用 vue2 的方法 $on $of $once但是提示已废弃 故探索vue3 方案， 引用外部库 mitt
  //   // })
  // }
})
</script>

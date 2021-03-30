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
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    const submitForm = () => {
      context.emit('form-submit', 111)
    }
    const callback = (test: string | undefined) => {
      /************* ATTENTION 'test'type??? 单独一个string 会报错 难道传递过来的 HTMLElement 是undefined 或与生命周期有关' by xn213 **************/
      console.log('test emitter', typeof test, test)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
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

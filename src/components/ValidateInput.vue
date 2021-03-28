<template>
  <div class='validate-input-container pb-3'>
    <input class="form-control"
           v-bind="$attrs"
           :class="{'is-invalid': inputRef.error}"
           :value="inputRef.val"
           @input="updateValue"
           @blur="validateInput">
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
import { RuleProp } from '../const/int'
import { EMAIL_REGEX } from '../utils/regex'

export type RulesProp = RuleProp[]
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String
  },
  inheritAttrs: false,
  setup (props, context) {
    console.log('$attrs', context.attrs) // proxy 对象
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = EMAIL_REGEX.test(inputRef.val)
              break
            case 'range':
              passed = (inputRef.val.trim().length >= 5 && inputRef.val.trim().length <= 15)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>

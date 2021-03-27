<template>
  <div class='validate-input-container pb-3'>
    <input type="text"
           class="form-control"
           :class="{'is-invalid': inputRef.error, 'is-valid': inputRef.val && !inputRef.error}"
           v-model="inputRef.val"
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
    rules: Array as PropType<RulesProp>
  },
  setup (props) {
    const inputRef = reactive({
      val: '',
      error: false,
      message: ''
    })
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
      }
    }
    return {
      inputRef,
      validateInput
    }
  }
})
</script>

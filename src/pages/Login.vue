<template>
  <div class='login'>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="inputEmail" class="form-label">邮箱地址-组件抽离版</label>
        <validate-input :rules="emailRules"
                        v-model="emailVal"
                        placeholder="请输入邮箱地址"
                        type="text"
                        ref="inputRef"/>
      </div>
      <div class="mb-3">
        <label for="inputPassword" class="form-label">密码-组件抽离版</label>
        <validate-input placeholder="请输入密码"
                        type="password"
                        v-model="passwordVal"
                        :rules="passwordRules"/>
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
export default defineComponent({
  name: 'Login',
  props: {},
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' },
      { type: 'range', message: '邮箱长度应大于或等于6 小于或等于16' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      { type: 'range', message: '密码长度应大于或等于6 小于或等于16' }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        // router.push('/column')
        // router.push({ name: 'column', params: { id: 1 } })

        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload).then(data => {
          console.log('data: ', data)
          router.push('/')
        }).catch(err => {
          console.log('err: ', err)
        })

        // router.push('/')
        // store.commit('login')
      }
    }
    return {
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

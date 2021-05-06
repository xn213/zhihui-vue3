<template>
  <div class='signup-page mx-auto p-3 w-330'>
    <h5 class="my-4 text-center">注册知会账户</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-1">
        <label for="from-label">邮箱地址</label>
        <validate-input :rules="emailRules"
                        v-model="formData.email"
                        placeHolder="请输入邮箱地址"
                        type="text"/>
      </div>
      <div class="mb-1">
        <label for="from-label">昵称</label>
        <validate-input :rules="nameRules"
                        v-model="formData.nickName"
                        placeHolder="请输入昵称"
                        type="text"/>
      </div>
      <div class="mb-1">
        <label for="from-label">密码</label>
        <validate-input :rules="passwordRules"
                        v-model="formData.password"
                        placeHolder="请输入密码"
                        type="password"/>
      </div>
      <div class="mb-1">
        <label for="from-label">重复密码</label>
        <validate-input :rules="repeatPasswordRules"
                        v-model="formData.repeatPassword"
                        placeHolder="再次输入密码"
                        type="password"/>
      </div>
      <template #submit>
        <button type="submit"
                class="btn btn-primary btn-block btn-large">注册新用户</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import createMessage from '../components/createMessage'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Signup',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const store = useStore()
    const formData = reactive({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    const router = useRouter()
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: formData.email,
          nickName: formData.nickName,
          password: formData.password
        }
        store.dispatch('createUser', payload).then(() => {
          createMessage('注册成功 正在跳转到登录页面', 'success')
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }).catch(err => {
          console.log('signuperr: ', err)
        })
        // setTimeout(() => {
        //   console.log('payload', payload)
        //   router.push('/login')
        // }, 1000)
      }
    }
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' },
      { type: 'range', message: '邮箱长度大于6小于16' }
    ]
    const nameRules: RulesProp = [
      { type: 'required', message: '昵称不能为空' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const repeatPasswordRules: RulesProp = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        validater: () => {
          return formData.password === formData.repeatPassword
        },
        message: '密码不相同'
      }
    ]
    return {
      formData,
      onFormSubmit,
      emailRules,
      nameRules,
      passwordRules,
      repeatPasswordRules
    }
  }
})
</script>

<style>
.w-330 {
  max-width: 330px;
}
</style>

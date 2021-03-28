<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <form>
      <div class="mb-3">
        <label for="inputEmail" class="form-label">邮箱地址-组件抽离版</label>
        <validate-input :rules="emailRules"
                        v-model="emailVal"
                        placeholder="请输入邮箱地址"
                        type="text"/>
      </div>
      <div class="mb-3">
        <label for="inputPassword" class="form-label">密码-组件抽离版</label>
        <validate-input placeholder="请输入密码"
                        type="password"/>
      </div>
      <div class="mb-3">
        <label for="inputEmail" class="form-label">邮箱地址</label>
        <input type="email"
               class="form-control"
               id="inputEmail"
               aria-describedby="emailHelp"
               v-model="emailRef.val"
               @blur="validateEmail">
        <div class="form-text" v-if="emailRef.error">{{ emailRef.message }}</div>
      </div>
      <div class="mb-3">
        <label for="inputPassword" class="form-label">密码</label>
        <input type="password" class="form-control" id="inputPassword">
      </div>
    </form>
    <!-- <column-list :list="list"></column-list> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
// import ColumnList from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import { testData } from './const/testData'
import { EMAIL_REGEX } from './utils/regex'
const currentUser: UserProps = {
  id: 213,
  name: 'xn213',
  isLogin: true
}

export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateInput
  },
  setup () {
    const emailVal = ref('xn213')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' },
      { type: 'range', message: '邮箱长度应大于5 小于15' }
    ]
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'Email address can not be empty'
      } else if (!EMAIL_REGEX.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = 'should be valid email'
      } else {
        emailRef.error = false
      }
    }
    return {
      list: testData,
      currentUser,
      emailRef,
      validateEmail,
      emailRules,
      emailVal
    }
  }
})
</script>

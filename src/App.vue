<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item mb-0">© 2021 知会专栏</li>
          <li class="list-inline-item mb-0">文档</li>
          <li class="list-inline-item mb-0">联系</li>
          <li class="list-inline-item mb-0">更多</li>
          <li class="list-inline-item mb-0">github</li>
        </ul>
      </small>
    </footer>

    <!-- <validate-form @form-submit="onFormSubmit">
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
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form> -->
    <!-- <column-list :list="list"></column-list> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
// import ColumnList from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import { RulesProp } from './components/ValidateInput.vue'
// import ValidateForm from './components/ValidateForm.vue'
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
    // ValidateInput,
    // ValidateForm,
    GlobalHeader
  },
  setup () {
    const inputRef = ref<any>()
    const emailVal = ref('xn213@test.com')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' },
      { type: 'range', message: '邮箱长度应大于6 小于16' }
    ]
    const passwordVal = ref('abccccc')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
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
    const onFormSubmit = (result: boolean) => {
      console.log('result: ', result)
    }
    return {
      list: testData,
      currentUser,
      emailRef,
      validateEmail,
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit,
      inputRef
    }
  }
})
</script>

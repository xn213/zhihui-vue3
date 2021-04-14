<template>
  <div class='create-post-page'>
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="form-label">文章标题：</label>
        <validate-input :rules="titleRules"
                        v-model="titleVal"
                        placeholder="请输入文章标题"
                        type="text"/>
      </div>
      <div class="mb-3">
        <label for="form-label">文章详情：</label>
        <validate-input :rules="contentRules"
                        v-model="contentVal"
                        placeholder="请输入文章详情"
                        type="text"
                        tag="textarea"
                        rows="10"/>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps, PostProps } from '../store'
// import { PostProps } from '../const/testData'
export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput
  },
  name: 'CreatePost',
  setup () {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const titleVal = ref('')
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            _id: new Date().getTime() + '',
            title: titleVal.value,
            column: columnId.toString(),
            content: contentVal.value,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: columnId } })
        }
      }
    }
    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit
    }
  }
})
</script>

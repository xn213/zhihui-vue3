<template>
  <div class='create-post-page'>
    <h4>新建文章</h4>
    <!-- <input type="file" name="file" @change="handleFileChange" /> -->
    <uploader action="/api/upload"
              :beforeUpload="uploadCheck"
              @file-uploaded="handleFileUploaded"
              class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4">
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url">
      </template>
    </uploader>
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
import Uploader from '../components/Uploader.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps, PostProps, ResponseType } from '../store'
import axios from 'axios'
import { beforeUploadCheck } from '../utils/helper'
import createMessage from '../components/createMessage'
import { ImageProps } from '../../../codes/zheye/src/store'
// import { PostProps } from '../const/testData'
export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput,
    Uploader
  },
  name: 'CreatePost',
  setup () {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    let imageId = ''
    const titleVal = ref('')
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            _id: new Date().getTime() + '',
            title: titleVal.value,
            column,
            content: contentVal.value,
            createdAt: new Date().toLocaleString(),
            author: _id
          }
          if (imageId) {
            newPost.image = imageId
          }
          store.dispatch('createPost', newPost).then(() => {
            createMessage('发表成功 2秒后跳转到文章', 'success', 2000)
            setTimeout(() => {
              router.push({ name: 'column', params: { id: column } })
            }, 2000)
          })
        }
      }
    }
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadedFile = files[0]
        const formData = new FormData()
        formData.append(uploadedFile.name, uploadedFile)
        axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res: any) => {
          console.log('uploadfile res: ', res)
        })
      }
    }
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传图片只能是 JPG/PNG 格式', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过1M', 'error')
      }
      return passed
    }
    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit,
      handleFileChange,
      uploadCheck,
      handleFileUploaded
    }
  }
})
</script>

<style>
  .create-post-page .file-upload-container {
    height: 200px;
    cursor: pointer;
  }
  .create-post-page .file-upload-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

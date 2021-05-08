<template>
  <div class='home-page'>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50">
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <router-link to="/createpost" class="btn btn-primary my-3">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>

    <uploader action="/api/upload"
              :beforeUpload="beforeUpload"
              @file-uploaded="onFileUploaded"
              @file-uploaded-error="onFileUploadedError"></uploader>

    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list" />
    <h2>{{ biggerColumnLen }}</h2>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import Uploader from '../components/Uploader.vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ResponseType, ImageProps } from '../store'
import createMessage from '../components/createMessage'
// import { testData } from '../const/testData'
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList,
    Uploader
  },
  setup () {
    const store = useStore<GlobalDataProps>()

    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        createMessage('上传图片只能是 jpg 格式', 'error')
      }
      return isJPG
    }
    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片Id ${rawData.data._id}`, 'success')
      console.log('asfd')
    }

    const onFileUploadedError = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片 Id ${rawData.data._id}`, 'error')
    }

    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.state.columns)
    // const biggerColumnLen = computed(() => store.state.columns.filter(c => c.id > 2).length)
    const biggerColumnLen = computed(() => store.getters.biggerColumnLen)
    return {
      list,
      biggerColumnLen,
      beforeUpload,
      onFileUploaded,
      onFileUploadedError
    }
  }
})
</script>

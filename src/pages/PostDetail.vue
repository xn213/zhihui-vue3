<template>
  <div class='post-detail-page'>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentImageUrl" alt="currentPost.title" class="rounded-lg img-fluid my-4" v-if="currentImageUrl">
      <h2 class="mb-4">{{currentPost.title}}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于: {{currentPost.createdAt}}</span>
      </div>
      <div>{{currentHTML}}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { PostProps } from '../store'
import UserProfile from '../components/UserProfile.vue'
import MarkdownIt from 'markdown-it'
import { ImageProps } from '../../../codes/zheye/src/store'
export default defineComponent({
  name: 'post-detail',
  props: {},
  components: {
    UserProfile
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const currentId = route.params.id
    onMounted(() => {
      store.dispatch('fetchPost', currentId)
    })
    const md = new MarkdownIt()
    const currentHTML = computed(() => {
      if (currentPost.value && currentPost.value.content) {
        return md.render(currentPost.value.content)
      }
      return { ni: 'ni' }
    })
    const currentPost = computed<PostProps>(() => store.getters.getCurrentPost(currentId))
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      } else {
        return null
      }
    })
    return {
      currentPost,
      currentImageUrl,
      currentHTML
    }
  }
})
</script>

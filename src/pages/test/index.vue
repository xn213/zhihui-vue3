<template>
  <div class="test">
    <div class="mock-s-worker">
      <button class="btn" @click="handleLogin">login</button>
      <button class="btn" @click="handleGetUser">get user</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'test',
  setup () {
    const handleLogin = () => {
      fetch('/login', {
        method: 'POST'
      }).then((v) => {
        console.log('v', v)
      })
    }

    const handleGetUser = () => {
      fetch('user')
        .then((v) => {
          return v.json()
        })
        .then((v) => {
          console.log('v.json', v)
        })
    }

    return {
      handleLogin,
      handleGetUser
    }
  }
})
</script>
<style>
.mock-s-worker {
  display: flex;
  justify-content: center;
}
.btn {
  margin: 13px;
  color: #fff;
  background: #1E80FF;
}
</style>

<template>
  <div id="wrapper">
    <main>
      <button @click="submit">Login with Github</button>
      <button @click="$router.replace('/')">Logout</button>
    </main>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'login-page',
  mounted () {
    ipcRenderer.on('recieve-access-token', (event, accessToken) => {
      window.localStorage.setItem('accessToken', accessToken)
      this.$router.replace({ name: 'app-page' })
    })
  },
  methods: {
    submit () {
      ipcRenderer.send('request-access-token', '')
    }
  }
}
</script>

<style>
</style>

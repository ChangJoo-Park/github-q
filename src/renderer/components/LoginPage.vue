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
import axios from 'axios'

export default {
  name: 'login-page',
  mounted () {
    const accessToken = window.localStorage.getItem('accessToken')

    const url = `https://api.github.com/user?access_token=${accessToken}`
    axios.get(url)
      .then(response => this.$router.replace({ name: 'app-page' }))
      .catch(_ => console.log('error'))

    ipcRenderer.on('recieve-access-token', (event, accessToken) => {
      console.log('accessToken => ', accessToken)
      window.localStorage.setItem('accessToken', accessToken)
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

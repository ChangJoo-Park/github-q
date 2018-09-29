<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  mounted () {
    this.checkAuth()
  },
  methods: {
    checkAuth () {
      const accessToken = window.localStorage.getItem('accessToken')

      if (!accessToken) {
        this.goToLoginPage()
      }

      console.log(accessToken)
      // Check
      // https://api.github.com/user?access_token=169054c73441caf9fc64286afe2bb8133019a0e5
      const url = `https://api.github.com/user?access_token=${accessToken}`
      axios.get(url)
        .then(response => this.goToAppPage())
        .catch(_ => this.goToLoginPage())
    },
    goToLoginPage () {
      this.$router.replace({ name: 'login-page' })
    },
    goToAppPage () {
      this.$router.replace({ name: 'app-page' })
    }
  }
}
</script>

<style>
</style>

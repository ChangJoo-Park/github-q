<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.fetchGithubUser()
      .then(this.goToAppPage)
      .catch(this.goToLoginPage)
  },
  methods: {
    ...mapActions(['fetchGithubUser']),
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

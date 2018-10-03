<template>
  <div class="stats-wrapper">
    <pre>{{ githubUser }}</pre>
    {{ repositories }}
  </div>
</template>

<script>
import Service from '@/services'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      repositories: []
    }
  },
  watch: {
    githubUser (user) {
      if (user.login) {
        this.fetchRepositories(user.login)
      }
    }
  },
  mounted () {
    if (this.githubUser) {
      this.fetchRepositories(this.githubUser.login)
    }
  },
  computed: {
    ...mapGetters(['githubUser'])
  },
  methods: {
    fetchRepositories (username) {
      Service.getPushedRepos(this.githubUser.login)
        .then((response) => {
          this.repositories = response.data
        })
    }
  }
}
</script>

<style lang="css">
.stats-wrapper {
  overflow: auto;
  height: 100vh;
}
</style>

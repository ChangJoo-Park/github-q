<template>
  <div class="stats-wrapper">
    <div class="stats-user" v-if="githubUser">
        {{ totalPushedRepo }}
    </div>
    <div class="stats-repositories">

    </div>
    <pre>{{ githubUser }}</pre>
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
  created () {
    if (this.githubUser) {
      this.fetchRepositories(this.githubUser.login)
    }
  },
  computed: {
    ...mapGetters(['githubUser']),
    totalPushedRepo () {
      return this.repositories.length
    },
    mainLanguages () {

    }
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

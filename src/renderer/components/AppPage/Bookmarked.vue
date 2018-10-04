<template>
  <div class="bookmarked-wrapper">
    <issue v-for="issue in issues" :key="issue.id" :issue="issue" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Store from '@/store/db'
import Service from '@/services'

import Issue from '@/components/Shared/Issue'

export default {
  components: {
    Issue
  },
  data () {
    return {
      issues: null
    }
  },
  computed: {
    ...mapGetters(['githubUser'])
  },
  watch: {
    githubUser (user) {
      if (user) {
        this.fetchBookmarkedIssues(user.id)
      }
    }
  },
  mounted () {
    if (this.githubUser) {
      this.fetchBookmarkedIssues(this.githubUser.id)
    }
  },
  methods: {
    async fetchBookmarkedIssues (id) {
      const bookmarked = await Store.getBookmarked(id)
      const bookmarkedUrls = bookmarked.map(b => b.url)
      const result = await Service.getIssuesByUrls(bookmarkedUrls)
      this.issues = result.map((r) => {
        return r.data
      })
    }
  }
}
</script>

<style>
.bookmarked-wrapper {
  height: 100vh;
  overflow: auto;
}
</style>

<template>
  <loader-wrapper :is-loaded="isLoaded">
    <div v-if="issues" class="issue-wrapper">
      <div class="issue-listing-wrapper">
        <div class="issue-listings">
          <issue
          v-for="issue in issues"
          :key="issue.id"
          :issue="issue"
          :is-selected="isSelectedIssue(issue)"
          @click.native="onClickIssue(issue)"
          />
        </div>
      </div>
      <issue-detail class="issue-details" :issue="selectedIssue">
        <vs-button vs-color="dark" vs-type="filled" @click="onCloseSelectedIssue">Close</vs-button>
      </issue-detail>
    </div>
    <div v-else>
      <h1>There is no Assigned Issues</h1>
    </div>
  </loader-wrapper>
</template>

<script>
import { mapGetters } from 'vuex'

import Store from '@/store/db'
import Service from '@/services'

import LoaderWrapper from '@/components/Shared/LoaderWrapper'
import Issue from '@/components/Shared/Issue'
import IssueDetail from '@/components/Shared/IssueDetail'

export default {
  components: {
    LoaderWrapper,
    Issue,
    IssueDetail
  },
  data () {
    return {
      issues: null,
      isLoaded: false,
      selectedIssue: null
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
      this.isLoaded = true
    },
    onClickIssue (issue) {
      this.selectedIssue = issue
    },
    onCloseSelectedIssue () {
      this.selectedIssue = null
      this.fetchBookmarkedIssues()
    },
    isSelectedIssue (issue) {
      if (!this.selectedIssue || !issue) {
        return false
      }
      return issue.id === this.selectedIssue.id
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

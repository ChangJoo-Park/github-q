<template>
  <div>
    <h1 class="page-title">Mentioned Issues</h1>
    <loader-wrapper :is-loaded="isLoaded">
      <div v-if="mentionedIssues" class="issue-wrapper">
        <div class="issue-listing-wrapper">
          <div class="issue-listings">
            <issue
            v-for="issue in mentionedIssues"
            :key="issue.id"
            :issue="issue"
            @click.native="onClickIssue(issue)"
            />
          </div>
        </div>
        <issue-detail class="issue-details" v-if="selectedIssue" :issue="selectedIssue">
          <button type="button" name="button" @click="onCloseSelectedIssue">Close</button>
        </issue-detail>
      </div>
      <div v-else>
        <h1>There is no Assigned Issues</h1>
      </div>
    </loader-wrapper>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
      isLoaded: false,
      selectedIssue: null
    }
  },
  mounted () {
    this.fetchIssues()
  },
  computed: {
    ...mapGetters(['mentionedIssues'])
  },
  methods: {
    ...mapActions(['fetchMentionedIssues']),
    onClickIssue (issue) {
      this.selectedIssue = issue
    },
    onCloseSelectedIssue () {
      this.selectedIssue = null
      this.fetchIssues()
    },
    fetchIssues () {
      return this.fetchMentionedIssues()
        .then((response) => {
          this.isLoaded = true
        })
    }
  }
}
</script>

<style>

</style>

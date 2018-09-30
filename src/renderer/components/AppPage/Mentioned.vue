<template>
  <div>
    <h1 class="page-title">Mentioned Issues</h1>
    <loader-wrapper :is-loaded="isLoaded">
      <div v-if="issues" class="issue-wrapper">
        <div class="issue-listing-wrapper">
          <div class="issue-listings">
            <issue
            v-for="issue in issues"
            :key="issue.id"
            :issue="issue"
            @click.native="onClickIssue(issue)"
            />
          </div>
        </div>
        <issue-detail class="issue-details" v-if="selectedIssue" :issue="selectedIssue">
          <button type="button" name="button" @click="selectedIssue = null">Close</button>
        </issue-detail>
      </div>
      <div v-else>
        <h1>There is no Assigned Issues</h1>
      </div>
    </loader-wrapper>
  </div>
</template>

<script>
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
  mounted () {
    setTimeout(() => {
      Service.getMentionedIssues().then(({ data }) => {
        this.isLoaded = true
        this.issues = data
      })
    }, 100)
  },
  methods: {
    onClickIssue (issue) {
      this.selectedIssue = issue
    }
  }
}
</script>

<style>

</style>

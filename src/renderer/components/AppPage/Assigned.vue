<template>
  <div>
    <h1 class="page-title">Assigned Issues</h1>
    <loader-wrapper :is-loaded="isLoaded">
      <div v-if="assignedIssues" class="issue-wrapper">
        <div class="issue-listing-wrapper">
          <div class="issue-listings">
            <issue
            v-for="issue in assignedIssues"
            :key="issue.id"
            :issue="issue"
            @click.native="onClickIssue(issue)"
            />
          </div>
        </div>
        <issue-detail class="issue-details" v-if="selectedIssue" :issue="selectedIssue">
          <vs-button vs-color="dark" vs-type="filled" @click="onCloseSelectedIssue">Close</vs-button>
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
    Notification,
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
    this.fetchIssues()
  },
  computed: {
    ...mapGetters(['assignedIssues'])
  },
  methods: {
    ...mapActions(['fetchAssignedIssues']),
    onClickIssue (issue) {
      this.selectedIssue = issue
    },
    onCloseSelectedIssue () {
      this.selectedIssue = null
      this.fetchIssues()
    },
    fetchIssues () {
      return this.fetchAssignedIssues()
        .then((response) => {
          this.isLoaded = true
        })
    }
  }
}
</script>

<style>
.page-title {
  margin-bottom: 5px;
}
.issue-wrapper {
  display: flex;
  flex-direction: row;
}

.issue-listing-wrapper {
  flex: 1;
  height: calc(100vh - 40px);
  overflow-y: auto;
}

.issue-details {
  flex: 2;
}
</style>

<template>
  <div v-if="issue">
    <h3><small>{{repository.full_name}}</small>&nbsp;{{ issue.title }}</h3>
    <issue-label v-for="label in labels" :key="label.id" :label="label" />
    <div v-html="issue.body"></div>
    {{ createdInformation }} / {{ issue.comments }}
    <div class="">
      <issue-assignee v-for="assignee in assignees" :key="assignee.id" :assignee="assignee" />
    </div>
  </div>
</template>

<script>
import IssueLabel from '@/components/Shared/Issue/Label'
import IssueUser from '@/components/Shared/Issue/User'
import IssueAssignee from '@/components/Shared/Issue/Assignee'
export default {
  props: {
    issue: {
      type: Object
    }
  },
  components: {
    IssueLabel,
    IssueUser,
    IssueAssignee
  },
  computed: {
    user () {
      return this.issue.user
    },
    labels () {
      return this.issue.labels
    },
    assignees () {
      return this.issue.assignees
    },
    repository () {
      return this.issue.repository || {}
    },
    createdInformation () {
      const issueNumber = `#${this.issue.number}` || -1
      const state = `${this.issue.state}`
      const pastState = state === 'open' ? 'opened' : 'closed'
      const stateAt = state === 'open' ? this.issue.created_at : this.issue.closed_at
      const createdUser = this.user.login
      return `${issueNumber} ${pastState} at ${stateAt} by ${createdUser}`
    }
  }
}
</script>

<style lang='css'>
</style>

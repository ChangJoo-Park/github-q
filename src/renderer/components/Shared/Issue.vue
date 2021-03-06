<template>
  <div v-if="issue" class="issue" :class="{ selected: isSelected }" :title="issue.body">
    <span class="issue-title-repo">{{ repositoryPath }}</span>
    <h3 class="issue-title">
      &nbsp;{{ issue.title }}
      <issue-label v-for="label in labels" :key="label.id" :label="label" />
    </h3>
    <div class="issue-meta">
      {{ createdInformation }} /
      <span class="issue-comments"><i class="material-icons" style="vertical-align: middle;">comment</i> {{ issue.comments }}</span>
    </div>
    <div class="issue-assignees" v-if="assignees">
      <issue-assignee v-for="assignee in assignees" :key="assignee.id" :assignee="assignee" :title="assignee.login"/>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

import IssueLabel from '@/components/Shared/Issue/Label'
import IssueUser from '@/components/Shared/Issue/User'
import IssueAssignee from '@/components/Shared/Issue/Assignee'
import Utils from '@/utils'

export default {
  props: {
    issue: {
      type: Object
    },
    isSelected: {
      type: Boolean,
      default: () => false
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
    repositoryPath () {
      if (this.repository && this.repository.full_name) {
        return this.repository.full_name
      }
      return this.issue.repository_url.replace('https://api.github.com/repos/', '')
    },
    createdInformation () {
      const issueNumber = `#${this.issue.number}` || -1
      const state = `${this.issue.state}`
      const pastState = state === 'open' ? 'opened' : 'closed'
      const stateAt = state === 'open' ? this.issue.created_at : this.issue.closed_at
      const createdUser = this.user.login
      return `${issueNumber} ${pastState} at ${format(stateAt, 'MMMM dd YYYY h:mm aa')} by ${createdUser}`
    },
    markdownParsedBody () {
      const body = this.issue.body || ''
      return Utils.parseMarkdown(body.substring(0, 140))
    }
  }
}
</script>

<style lang='scss'>
.issue {
  padding: 1rem;
  cursor: pointer;
  word-wrap: break-word;
  border-bottom: 1px solid rgba(47, 47, 47, 0.1);
}

.issue-title {
  margin-bottom: 5px;
}

.issue-title-repo {
  margin-right: 5px;
  color: grey;
}

.issue-meta {
  font-size: 1rem;
  color: #2f2f2f;
}

.issue-body {
  margin-top: 1rem;
}

.issue-body img {
  display: block;
  max-height: 400px;
}

.issue-body {
  h1, h2, h3, h4, h5 {
    margin-bottom: 1rem;
  }
}

.issue-body ul, .issue-body ol {
  margin-left: 1rem;
}

.issue-assignees {
  margin-top: 1rem;
}

.issue.selected {
  background-color: #ddd;
}
.issue-comments {
  font-size: 24px;
  vertical-align: middle;
}
</style>

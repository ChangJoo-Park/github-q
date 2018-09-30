<template>
  <div v-if="issue" class="issue">
    <h3 class="issue-title">
      <small class="issue-title-repo">{{repository.full_name}}</small>&nbsp;{{ issue.title }}
      <issue-label v-for="label in labels" :key="label.id" :label="label" />
    </h3>
    <div class="issue-meta">
      {{ createdInformation }} / {{ issue.comments }}
    </div>
    <div class="issue-body" v-html="markdownParsedBody" />
    <div class="issue-assignees">
      <issue-assignee v-for="assignee in assignees" :key="assignee.id" :assignee="assignee" />
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import { format } from 'date-fns'

import IssueLabel from '@/components/Shared/Issue/Label'
import IssueUser from '@/components/Shared/Issue/User'
import IssueAssignee from '@/components/Shared/Issue/Assignee'

const md = MarkdownIt()
  .use(require('markdown-it-checkbox'))
  .use(require('markdown-it-link-attributes'), {
    attrs: {
      target: '_blank',
      rel: 'noopener'
    }
  })

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
      return `${issueNumber} ${pastState} at ${format(stateAt, 'MMMM dd YYYY h:mm aa')} by ${createdUser}`
    },
    markdownParsedBody () {
      const body = this.issue.body || ''
      return md.render(body.substring(0, 140))
    }
  }
}
</script>

<style lang='scss'>
.issue {
  box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
  margin: .5rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 1rem;
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

.issue-body ul {
  margin-left: 1rem;
}

.issue-assignees {

}
</style>

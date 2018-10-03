<template>
  <div class="issue-detail">
    <div class="issue-detail-body">
      <div class="issue-details-actions">
        <slot />
      </div>
      <div class="issue-detail-info">
        <h3>{{ issue.title }}</h3>
      </div>
      <div v-html="parsedBody"></div>
      <vs-divider />
      <div class="issue-detail-comments">
        <comments :comments="comments" />
      </div>
    </div>
    <div class="issue-detail-composer">
      <vs-textarea label="New Comment" v-model="newComment" />
      <vs-button vs-color="primary" vs-type="filled" @click.prevent="submitComment">Submit</vs-button>
    </div>
  </div>
</template>

<script>
import Service from '@/services'

import Comments from '@/components/Shared/Comments'
import Util from '@/utils.js'

export default {
  props: {
    issue: {
      type: Object
    }
  },
  components: {
    Comments
  },
  data () {
    return {
      comments: [],
      newComment: ''
    }
  },
  watch: {
    issue (value) {
      this.comments = []
      this.fetchComments(this.issue.comments_url)
    }
  },
  computed: {
    parsedBody () {
      return Util.parseMarkdown(this.issue.body)
    }
  },
  mounted () {
    this.fetchComments(this.issue.comments_url)
  },
  methods: {
    fetchComments (commentsUrl) {
      Service.getComments(commentsUrl).then((response) => {
        this.comments = []
        this.comments = response
      })
    },
    submitComment () {
      if (this.newComment.trim() === '') {
        return
      }

      const url = this.issue.comments_url
      Service.createCommentToIssue(url, this.newComment)
        .then((response) => {
          this.newComment = ''
          this.fetchComments(url)
        })
    }
  }
}
</script>

<style lang="css">
.issue-detail {
  overflow-y: auto;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  position: relative;
}

.issue-detail-body {
  flex: 1;
}

.issue-detail-info {
  flex: 0;
  min-height: 20px;
}

.issue-detail-comments {
  flex: 1;
}

.issue-detail-composer {
  flex-shrink: 0;
  min-height: 30px;
  padding: .5rem .5rem;
}

.issue-details-actions {
  text-align: right;
  position: absolute;
  top: 0;
  right: 1rem;
}
</style>

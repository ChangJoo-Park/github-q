<template>
  <div class="issue-detail">
    <div class="issue-detail-info">
      {{ issue.title }}
    </div>
    <div class="issue-detail-comments">
      <comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
    <div class="issue-detail-composer">
      <input type="text" name="" value="">
    </div>
  </div>
</template>

<script>
import Service from '@/services'

import Comment from '@/components/Shared/Comment'
export default {
  props: {
    issue: {
      type: Object
    }
  },
  components: {
    Comment
  },
  data () {
    return {
      comments: []
    }
  },
  watch: {
    issue (value) {
      console.log('issue changed')
      this.fetchComments(this.issue.comments_url)
    }
  },
  mounted () {
    this.fetchComments(this.issue.comments_url)
  },
  methods: {
    fetchComments (commentsUrl) {
      this.comments = []
      Service.getComments(commentsUrl).then((response) => {
        this.comments = response
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
}

.issue-detail-info {
  flex: 0;
  min-height: 20px;
}

.issue-detail-comments {
  flex: 1;
}

.issue-detail-composer {
  flex: 0;
  min-height: 30px;
}
</style>

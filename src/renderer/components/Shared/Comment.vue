<template>
  <div class="comment-wrapper">
    <div class="comment-header" v-if="user">
      <vs-avatar  size="50px" :src="user.avatar_url"/>
    </div>
    <div class="comment-info">
      <strong v-if="user">{{ user.login }}</strong>
      <span class="comment-date">{{ formattedUpdatedAt }}</span>
      <div class="comment-body" v-html="comment.body">
      </div>
      <vs-divider />
    </div>
  </div>
</template>

<script>
import Utils from '@/utils'
import { format } from 'date-fns'

export default {
  props: {
    comment: {
      type: Object
    }
  },
  computed: {
    user () {
      return this.comment.user || {}
    },
    parsedBody () {
      const body = this.comment.body || ''
      return Utils.parseMarkdown(body)
    },
    formattedUpdatedAt () {
      return format(this.comment.updated_at, 'MMMM dd YYYY h:mm aa')
    }
  }
}
</script>

<style lang="css">
.comment-wrapper {
  display: flex;
}

.comment-header {
  margin-right: 1rem;
  flex: 0;
}

.comment-date {
  text-align: right;
}

.comment-info {
  flex: 1;
}

.comment-body {
  margin-top: 1rem;
}
</style>

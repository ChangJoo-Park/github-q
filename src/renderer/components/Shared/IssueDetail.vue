<template>
  <div class="issue-detail" v-if="issue">
    <div class="issue-detail-body">
      <div class="issue-details-actions">
        <vs-button vs-color="warning" vs-type="filled" @click="toggleBookmark">
          <template v-if="isBookmarked">
            Delete Bookmark
          </template>
          <template v-else>
            Add Bookmark
          </template>
        </vs-button>&nbsp;
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
  <div class="issue-detail-empty" v-else>
    <h1>Please Select Issue</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Service from '@/services'
import Store from '@/store/db'

import Comments from '@/components/Shared/Comments'
import Util from '@/utils.js'

export default {
  props: {
    issue: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Comments
  },
  data () {
    return {
      comments: [],
      newComment: '',
      isBookmarked: false
    }
  },
  watch: {
    issue (value) {
      this.comments = []
      this.checkBookmarked()
      this.fetchComments(this.issue.comments_url)
    }
  },
  computed: {
    ...mapGetters(['githubUser']),
    parsedBody () {
      return Util.parseMarkdown(this.issue.body)
    }
  },
  mounted () {
    if (this.issue) {
      this.checkBookmarked()
      this.fetchComments(this.issue.comments_url)
    }
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
    },
    checkBookmarked () {
      Store.getBookmarked(this.githubUser.id)
        .then((response) => {
          const bookmarked = response.find((b) => {
            return b.url === this.issue.url
          })
          this.isBookmarked = !!bookmarked
        })
        .catch((error) => {
          console.error(error)
        })
    },
    toggleBookmark () {
      const userId = this.githubUser.id
      const url = this.issue.url
      if (this.isBookmarked) {
        Store.removeBookmark(userId, url)
          .then((response) => {
            this.isBookmarked = false
          })
      } else {
        Store.createNewBookmark(userId, url, '')
          .then((response) => {
            this.isBookmarked = true
          })
      }
    }
  }
}
</script>

<style lang="css">
.issue-detail, .issue-detail-empty {
  padding: 1rem;
}

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

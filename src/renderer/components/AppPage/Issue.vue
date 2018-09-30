<template>
  <div>
    <div class="title-wrapper">
      <h1 class="title" v-if="issue">
        {{ issue.name }}
      </h1>
      <vs-divider />
    </div>
    <div class="issue-listing" v-if="result">
      <div class="" style="text-align: center;">
        total {{result.total_count}}
      </div>
      <issue v-for="issue in result.items" :key="issue.id" :issue="issue"/>
    </div>
  </div>
</template>

<script>
import Service from '@/services'
import Store from '@/store/db'

import Issue from '@/components/Shared/Issue'

export default {
  components: {
    Issue
  },
  data () {
    return {
      issue: null,
      result: null
    }
  },
  watch: {
    '$route.params' () {
      this.fetchIssueResultByQuery()
    }
  },
  mounted () {
    this.fetchIssueResultByQuery()
  },
  methods: {
    fetchIssueResultByQuery () {
      Service.getUser().then((user) => {
        Store.getIssue(user.id, this.$route.params.id).then((response) => {
          this.issue = response
          this.result = []
          Service.getSearchResult(this.issue.query, 1, 10).then((response) => {
            this.result = response.data
          })
        })
      })
    }
  }
}
</script>

<style>
.title-wrapper {
  position: fixed;
  top:0;
  width: 100%;
  background-color: #fff;
}

.issue-listing {
  margin-top: 70px;
}
</style>

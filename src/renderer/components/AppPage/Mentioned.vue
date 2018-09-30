<template>
  <div>
    <h1>Mentioned Issues</h1>
    <loader-wrapper :is-loaded="isLoaded">
      <div v-if="issues">
        <issue v-for="issue in issues" :key="issue.id" :issue="issue"/>
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

export default {
  components: {
    LoaderWrapper,
    Issue
  },
  data () {
    return {
      issues: null,
      isLoaded: false
    }
  },
  mounted () {
    setTimeout(() => {
      Service.getMentionedIssues().then(({ data }) => {
        this.isLoaded = true
        this.issues = data
      })
    }, 100)
  }
}
</script>

<style>

</style>

<template>
  <div>
    <h1>Assigned Issues</h1>
    <loader-wrapper :is-loaded="isLoaded">
      <div v-if="items">
        <div v-for="item in items" :key="item.id">
          <pre>{{ item }}</pre>
        </div>
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

export default {
  components: {
    Notification,
    LoaderWrapper
  },
  data () {
    return {
      items: null,
      isLoaded: false
    }
  },
  mounted () {
    setTimeout(() => {
      Service.getAssignedIssues().then(({ data }) => {
        this.isLoaded = true
        this.items = data
      })
    }, 100)
  }
}
</script>

<style>

</style>

<template>
  <div>
    <h1>Notifications</h1>
    <loader-wrapper :is-loaded="isLoaded">
      <div v-if="items" class="notification-wrapper">
        <notification v-for="item in items" :key="item.id" :notification="item"/>
      </div>
      <div v-else>
        <h1>There is no notifications</h1>
      </div>
    </loader-wrapper>
  </div>
</template>

<script>
import Service from '@/services'

import Notification from '@/components/Shared/Notification'
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
    Service.getNotifications().then(({ data }) => {
      this.isLoaded = true
      this.items = data
    })
  }
}
</script>

<style>
.notification-wrapper {
  overflow-y: auto;
  height: calc(100vh - 40px);
}
</style>

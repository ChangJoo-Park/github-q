<template>
  <div>
    <h1>Notifications</h1>
    <loader-wrapper :is-loaded="isLoaded">
      <div v-if="notifications" class="notification-wrapper">
        <notification v-for="item in notifications" :key="item.id" :notification="item"/>
      </div>
      <div v-else>
        <h1>There is no notifications</h1>
      </div>
    </loader-wrapper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Notification from '@/components/Shared/Notification'
import LoaderWrapper from '@/components/Shared/LoaderWrapper'

export default {
  components: {
    Notification,
    LoaderWrapper
  },
  computed: {
    ...mapGetters(['notifications']),
    isLoaded () {
      return this.notifications !== null
    }
  }
}
</script>

<style>
.notification-wrapper {
  overflow-y: auto;
  height: calc(100vh - 40px);
}
</style>

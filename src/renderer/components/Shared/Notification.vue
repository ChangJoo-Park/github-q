<template>
  <div class="notification">
    <div class="notification-info">
      {{ notification.updated_at }} / {{ notification.reason }}
    </div>
    <div class="notification-subject">
      {{ notification.subject.type }} - {{ notification.subject.title }}
    </div>
    <div class="notification-repository">
      {{ notification.repository.name }}
      {{ notification.repository.html_url }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object
    }
  }
}
</script>

<style>
.notification {
  margin-bottom: 1rem;
}
</style>

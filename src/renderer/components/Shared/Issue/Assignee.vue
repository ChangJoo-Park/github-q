<template>
  <vs-avatar :src="assignee.avatar_url" :title="assignee.login" />
</template>

<script>
export default {
  props: {
    assignee: {
      type: Object
    }
  }
}
</script>

<style lang="css">
</style>

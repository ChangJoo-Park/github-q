<template>
  <div>
    <comment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script>
import Comment from '@/components/Shared/Comment'

export default {
  props: {
    comments: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Comment
  }
}
</script>

<style lang="css">
</style>

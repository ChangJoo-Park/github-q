<template>
  <div class="">
    {{ comment.body }}
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object
    }
  }
}
</script>

<style lang="css">
</style>

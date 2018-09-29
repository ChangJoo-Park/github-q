<template>
  <div>
    <div v-if="isLoaded">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoaded: {
      type: Boolean,
      default: () => false
    }
  },
  mounted () {
    this.$vs.loading()
  },
  watch: {
    isLoaded (value) {
      if (value) {
        this.$vs.loading.close()
      }
    }
  }
}
</script>

<style>
/* CSS */
* {
  font-family: sans-serif;
}
</style>

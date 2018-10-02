<template>
  <div class="loader-wrapper">
    <slot v-if="isLoaded" />
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
    if (!this.isLoaded) {
      this.$vs.loading()
    }
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
.loader-wrapper {
  overflow-y: hidden;
}
</style>

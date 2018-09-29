<template>
  <div>
    <div v-if="isLoaded">
      <slot />
    </div>
    <div v-else>
      불러오는 중입니다.
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
  }
}
</script>

<style>
/* CSS */
* {
  font-family: sans-serif;
}
</style>

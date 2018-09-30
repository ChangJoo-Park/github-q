<template>
  <span :style="labelStyle" class="label">
    {{ label.name }}
  </span>
</template>

<script>
import isDarkColor from 'is-dark-color'

export default {
  props: {
    label: {
      type: Object
    }
  },
  computed: {
    labelStyle () {
      const backgroundColor = this.label ? `#${this.label.color}` : `#000`
      const color = isDarkColor(backgroundColor) ? '#fff' : `#000`
      return {
        backgroundColor, color
      }
    }
  }
}
</script>

<style>
.label {
  box-sizing: border-box;
  padding: 3px 6px;
  border-radius: 3px;
  margin-right: 5px;
  font-size: 1rem;
}
</style>

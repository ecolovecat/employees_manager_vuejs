<template>
  <div v-if="show" :style="{zIndex:zIndexVal}" class="overlay-wrapper">
    <div class="overlay" @click="$emit('close')"></div>
    <div class="overlay-content" :style="{padding: padding}">
      <!-- Your overlay content goes here -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageOverlay',
  emits: [
    'close'
  ],
  props: {
    show: Boolean,
    padding: String,
    zIndexVal: {
      type: String,
      default: '9999'
    }
  }
}
</script>

<style scoped>
.overlay-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  cursor: pointer;
}

.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10000000;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 4px;
}
</style>

<template>
  <Overlay :zIndexVal="99999" :show="false" padding="24px">
    <div class="dialog">
      <div class="dialog-title" v-if="title">
        {{ title }}
      </div>
      <div class="dialog-content">
        <slot name="content">content</slot>
      </div>
      <div class="line" v-if="hasLine"></div>
      <div class="dialog-button">
        <slot name="button">button</slot>
      </div>
    </div>
  </Overlay>
</template>

<script>
import Overlay from "../common/Overlay.vue";
export default {
  name: "PageDialog",
  components: {
    Overlay,
  },
  props: {
    hasLine: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.overlay-content {
}
.dialog {
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 4px;
  z-index: 30;

  .line {
    height: 1px;
    background-color: #ccc;
    border: none;
  }
}
</style>
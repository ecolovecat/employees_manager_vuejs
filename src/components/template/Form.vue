<template>
  <Overlay :show='true' padding="16px" @close="$emit('close')">
    <div class="form">
      <div class="form-container">
        <div class="form-title">
          <div class="title bold">
            {{ formTitle }}
          </div>
          <div class="icon-exit-36 exit icon-24" @click="$emit('close')"></div>
        </div>
        <div class="form-content">
          <slot name="content"></slot>
        </div>

        <div class="line"></div>

        <div class="form-button">
          <slot name="button"></slot>
        </div>
      </div>
    </div>
  </Overlay>
</template>

<script>
import Overlay from "../common/Overlay.vue";
export default {
  name: "PageForm",
  emits: [
    'close'
  ],
  props: {
    formTitle: {
      type: String,
      default: "test",
    },
  },
  components: {
    Overlay,
  },
};
</script>

<style lang="scss">
.form-container {
  position: fixed;
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  padding: 24px;
  border-radius: 4px;

  .form-title {
    display: flex;
    justify-content: space-between;
  }

  .form-content {
    margin: 24px 0px;
  }

  .line {
    height: 1px;
    background-color: #ccc;
    border: none;
  }
}
</style>
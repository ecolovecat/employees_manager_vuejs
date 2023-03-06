<template>
  <div class="context-menu" v-if="show">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  props: {
    show: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style>
.context-menu {
  padding: 16px 0px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.059);
}

.context-menu-action {
  display: flex;
  align-items: center;
  height: 48px;
  width: 100%;
  max-width: 200px;
  padding: 0px 16px;
  gap: 8px;
}

.context-menu-action:hover {
  background-color: #e8e9ec;
  height: 48px;
  cursor: pointer;
  color: #54cc63;
}
</style>
<template>
  <button :class="['button', ' button-' + hierarchy]">
    {{name}}
  </button>
</template>

<script>
export default {
  name: 'PageButton',
  props: {
    name: String,
    hierarchy: String
  },
}
</script>

<style lang="scss" scoped>
.button {
  height: 32px !important;
  padding: 0 16px;
  border-radius: 4px;
  min-width: 80px;
  text-align: center;
  border: none;
  cursor: pointer;
}

.button-main {
  color: #fff;
  background-color: #019160;

  &:hover {
    background-color: #2fbe8e;
  }

  &:active {
    background-color: #01b075;
  }
}

.button-secondary {
  background-color: #FFFFFF;
  color: #1F1F1F;
  border: 1px solid #E6E6E6;

  &:hover {
    background-color: #f6f6f6;
  }

  &:active {
    background-color: #ebebeb;
  }
  
}
</style>
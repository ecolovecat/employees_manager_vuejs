<template>
  <div class="loading" :show="show">
    <div class="overlay" @click="finishLoading"></div>
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name:"PageLoading",
  created() {
    // setTimeout(() => {
    //   this.$store.commit('loading', false)
    // }, 2000)
  },
  methods: {
    /**
     * Hoàn thành load dữ liệu
     * Trần Phương Duy
     */
    finishLoading() {
      this.$store.commit('loading', false)
    }
  }
};
</script>

<style scoped>
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
}

.loader {
  z-index: 5;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #019160;

  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  position: fixed;
  width: 30px;
  height: 30px;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 2;
  cursor: pointer;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
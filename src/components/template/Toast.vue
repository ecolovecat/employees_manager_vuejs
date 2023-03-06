<template>
  <div class="toast">
    <div class="toast-container">
      <div class="toast-right">
        <div class="icon-success-24 icon-24"></div>
        <div class="toast-message">
          <span class="bold green">Thành công!</span> Đã xóa bản ghi.
        </div>
      </div>

      <div class="toast-left">
        <span class="text underline">Hoàn tác</span>
        <div class="icon-exit exit icon-24"></div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "PageToast",
  created() {
    setTimeout(() => {
      this.$store.commit('toastShow', false)
    }, 3000);
  }

}
</script>

<style scoped>
.toast-container {
  position: fixed;
  z-index: 3;
  background-color: #fff;
  top: 86%;
  right: 1%;
  display: flex;
  min-width: 450px;
  max-width: 650px;
  font-size: 14px;
  height: 56px;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  gap: 24px;
  box-shadow: 0px 3px 20px 0px rgba(0,0,0,0.078);
}

.message-title {
  font-family: MISA Font Bold;
}

.icon-exit {
  position: relative;
  top: 6px;
  right: -12px;
}

.toast-right  {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.toast-left {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
<template>
  <Dialog :show="showDeleteDialog" @close="closeDeleteDialog" :hasLine="true">
    <template v-slot:content>
      <div class="dialog__content-wrapper">
        <Icon iconName="icon-danger" iconSize="24" />
        <p class="dialog__content text">Bạn có thực sự muốn xóa nhân viên?</p>
      </div>
    </template>

    <template v-slot:button>
      <div class="dialog__button-wrapper">
        <Button @click="closeDeleteDialog" name="Không" hierarchy="secondary" />
        <Button name="Có" hierarchy="main" />
      </div>
    </template>
  </Dialog>
</template>

<script>
import Button from '../common/Button.vue'
import Icon from '../common/Icon.vue'
import Dialog from '../template/Dialog.vue'
export default {
  name: "DeleteDialog",
  components: {
    Dialog,
    Icon,
    Button
  },
  data() {
    return {
      showDeleteDialog: false,
    }
  }, 
  methods: {
    /**
     * Đóng dialog delete
     * Trần Phương Duy
     */
    closeDeleteDialog() {
      this.showDeleteDialog = false;
    },
  }
}
</script>

<style>

</style>
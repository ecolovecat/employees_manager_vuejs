<template>
  <div class="container">
    <div class="header">
      <Header></Header>
    </div>

    <div class="sidebar">
      <Sidebar></Sidebar>
    </div>

    <div class="content">
      <Content
        @openForm="openForm"
        @doubleClick="openFixForm()"
      />
    </div>
  </div>
  <Dialog :show="$store.state.deleteDialogShow" @close="closeDeleteDialog" :hasLine="true">
    <template v-slot:content>
      <div class="dialog__content-wrapper">
        <Icon iconName="icon-danger" iconSize="24" />
        <p class="dialog__content text">Bạn có thực sự muốn xóa nhân viên?</p>
      </div>
    </template>

    <template v-slot:button>
      <div class="dialog__button-wrapper">
        <Button @click="closeDeleteDialog" name="Không" hierarchy="secondary" />
        <Button name="Có" @click="deleteHandle" hierarchy="main" />
      </div>
    </template>
  </Dialog>

  <Dialog :show="$store.state.showValidate" @close="closeValidate" :hasLine="true">
    <template v-slot:content>
      <div class="dialog__content-wrapper">
        <Icon iconName="icon-alert " iconSize="36" />
        <p class="dialog__content text"> trường này hiện lỗi </p>
      </div>
    </template>

    <template v-slot:button>
      <div class="dialog__button-wrapper">
        <Button name="Đóng" @click="closeValidate" hierarchy="main" />
      </div>
    </template>
  </Dialog>

  <!-- Add form -->

  <AddForm v-if="showForm" @close="closeForm" formTitle="Thêm nhân viên" />

  <FixForm
    :show="showFixForm"
    @close="closeFixForm"
    formTitle="Sửa thông tin nhân viên"
  />
  <Toast v-if="$store.state.toastShow" />
  <Loading v-if="$store.state.loading" />
  <!-- <Combobox/> -->
</template>

<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import Content from "@/components/Content.vue";
import AddForm from "@/components/Form/AddForm.vue";
import FixForm from "@/components/Form/FixForm.vue";
import Dialog from "@/components/template/Dialog.vue";
import Icon from "@/components/common/Icon.vue";
import Button from "@/components/common/Button.vue";
import Toast from "@/components/template/Toast.vue";
import Loading from "@/components/Loading.vue";
// import Combobox from '@/components/common/Combobox.vue';
export default {
  name: "EmployeePage",
  components: {
    Header,
    Sidebar,
    Content,
    AddForm,
    FixForm,
    Dialog,
    Icon,
    Button,
    Toast,
    Loading,
  },
  data() {
    return {
      showForm: false,
      showDeleteDialog: false,
      showFixForm: false,
      toastShow: false,
      loading: false,
    };
  },
  methods: {
    openForm() {
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
    deleteEmployee() {
      this.showDeleteDialog = true;
    },
    closeDeleteDialog() {
      this.$store.commit('deleteDialogShow', false)
      this.$store.commit('deleteId', '')
    },
    openFixForm() {
      this.showFixForm = true;
    },
    closeFixForm() {
      this.showFixForm = false;
    },
    async deleteHandle() {
      this.$store.commit('loading', true)
      const resDelete = await fetch(
        "https://apidemo.laptrinhweb.edu.vn/api/v1/Employees/" + this.$store.state.eId,
        { method: "DELETE" }
      );
      let employee = await resDelete.json();
      this.$store.commit('loading', false)
      this.$store.commit('toastShow', true)
      this.$store.commit('deleteDialogShow', false)
      this.$store.commit('clickDelete', true)
      console.log(employee);
    },
    closeValidate() {
      this.$store.commit('showValidate', false)
    }
  },
};
</script>

<style lang="scss">
input[type="checkbox"]:checked {
  accent-color: green;
}

.checkbox-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
}
.container {
  width: 100%;
  display: grid;
  grid-template-columns: 200px calc(100% - 200px);
  grid-template-rows: 56px calc(100vh - 56px);

  .header {
    grid-column: 1/3;
    display: flex;
    align-items: center;
  }

  .sidebar {
  }

  .content {
    padding: 24px;
    border-style: solid none none none;
    border-width: 1px;
    border-color: #ccc;
    background-color: #eceef1;
  }
}

.dialog__content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  p.text {
    max-width: 300px;
    word-wrap: break-word;
    line-height: 18px;
    font-size: 14px;
  }
}

.dialog__button-wrapper {
  display: flex;
  justify-content: space-between;
}

.bold {
  font-family: Roboto Bold;
}

.italic {
  font-family: Roboto Italic;
}
</style>
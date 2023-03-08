<template>
  <div class="content__header">
    <div class="content__title">
      <p class="bold text title">Nhân viên</p>
    </div>

    <div class="content__button">
      <Button hierarchy="main" name="Thêm mới nhân viên" @click="$emit('openForm')" />
    </div>
  </div>

  <div class="content__body">
    <div class="content__body--header">
      <div class="content__body--search">
        <Input
          ref="search"
          placeholder="Tìm theo tên"
          type="search"
          iconName="icon-search"
          @inputValue="getSearchKey($event)"
        />
      </div>
      <Icon title="Refresh data" @click="refreshData" iconName="icon-refresh" iconSize="24" />
    </div>  
    <div class="content__body--table">
      <Table :apiUrl="'https://apidemo.laptrinhweb.edu.vn/api/v1/Employees'" 
        :headers="[{field: 'EmployeeCode', label: 'Mã nhân viên', className:'table-text'},
                    {field: 'FullName', label: 'Họ và tên', className:'table-text'}, 
                    {field: 'GenderName', label: 'Giới tính', className:'table-text'},
                    {field: 'DateOfBirth', label: 'Ngày sinh', className:'table-align birth-day'},
                    {field: 'Email', label: 'Email', className:'table-text'},
                    {field: 'IdentityNumber', label: 'Số CMND', className:'number', tooltip:'Số chứng minh nhân dân'},
                    {field: 'PhoneNumber', label: 'Số điện thoại', className:'number phone'},
                    {field: 'PositionName', label: 'Vị trí', className:'table-text'},
                    {field: 'MartialStatusName', label: 'Tình trạng hôn nhân', className:'table-text'},
                    {field: 'Salary', label: 'Lương', className:'number salary'},
                   ]"
        @doubleClick="$emit('doubleClick')"/>
    </div>
  </div>
</template>

<script>
import Button from "./common/Button.vue";
import Icon from "./common/Icon.vue";
import Input from "./common/Input.vue";
import Table from "./common/Table.vue";
export default {
  name: "PageContent",
  emits: [
    'openForm', 
    'doubleClick',
  ],
  data() {
    return {
      searchTerm: ""
    }
  },
  components: {
    Button,
    Icon,
    Input,
    Table,
  },
  mounted() {
  },
  methods: {
    refreshData() {
      this.$store.commit('loading', true)
      window.location.reload();
    },
    valueHandle(e) {
      console.log(123123, e);
    },
    getSearchKey(e) {
      this.$store.commit('searchTerm', e)
    }
  },
  watch: {
    
  }
};
</script>

<style lang="scss">
.content__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.content__body {
  background-color: #fff;
  height: 90%;

  .content__body--header {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 12px;
    padding: 12px;
  }

  .content__body--table {
    height: calc(100% - 32px - 24px);
  }
}
</style>
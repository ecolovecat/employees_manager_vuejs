<template>
  <Form :show="show" @close="$emit('close')">
    <template v-slot:content>
      <div class="form__information-basic">
        <div class="form-basic--left">
          <div class="form-input--merge form-input">
            <Input
              validate="[required]"
              :value="$store.state.fixData.EmployeeCode"
              :type="text"
              label="Mã"
            />
            <Input
              validate="[required]"
              :value="$store.state.fixData.FullName"
              :type="text"
              label="Tên"
            />
          </div>
            <Combobox
              label="Đơn vị"
              class="combobox"
              :value="$store.state.fixData.DepartmentName"
              url="https://apidemo.laptrinhweb.edu.vn/api/v1/Departments"
              propValue="DepartmentID"
              propText="DepartmentName"
            />

          <div class="form-input">
            <Input
              :type="text"
              :value="$store.state.fixData.PositionName"
              label="Chức danh"
            />
          </div>
        </div>
        <div class="form-basic--right">
          <div class="form-input--merge form-input">
            <Input type="date" label="Ngày sinh" />

            <Input
              type="radio"
              label="Giới tính"
              radioName="gender"
              v-model="Male"
              :value="$store.state.fixData.Gender"
              :radioOptions="[
                { label: 'Nam', value: 'Male', number: 1 },
                { label: 'Nữ', value: 'Female', number: 2 },
                { label: 'Khác', value: 'Other', number: 0 },
              ]"
            />
          </div>
          <div class="form-input--merge form-input">
            <Input
              type="text"
              title="Số chứng minhn nhân dân"
              label="Số CMND"
              :value="$store.state.fixData.IdentityNumber"
            />
            <Input type="date" validate="[birth]" label="Ngày sinh" />
          </div>
          <div class="form-input">
            <Input
              type="text"
              label="Nơi cấp"
              :value="$store.state.fixData.IdentityPlace"
            />
          </div>
        </div>
      </div>

      <div class="form__information-other form-input">
        <div class="form-input">
          <Input
            type="text"
            label="Địa chỉ"
            :value="$store.state.fixData.Address"
          />
        </div>
        <div class="form-input--merge form-input">
          <Input
            type="text"
            :value="$store.state.fixData.PhoneNumber"
            validate="[phone,required]"
            title="Điện thoại cố định"
            label="ĐT cố định"
          />
          <Input
            type="text"
            :value="$store.state.fixData.Email"
            validate="[email]"
            label="Email"
          />
          <Input
            type="text"
            :value="$store.state.fixData.Address"
            label="Địa chỉ"
          />
        </div>
        <div class="form-input--merge">
          <Input
            type="text"
            :value="$store.state.fixData.IdentityNumber"
            label="Tài khoản ngân hàng"
          />
          <Input
            type="text"
            :value="$store.state.fixData.Salary"
            label="Tên ngân hàng"
          />
          <Input
            type="text"
            :value="$store.state.fixData.IdentityPlace"
            label="Chi nhánh"
          />
        </div>
      </div>
    </template>
    <template v-slot:button>
      <div class="button-right">
        <Button name="Cắt" hierarchy="secondary" />
        <Button name="Thêm và cắt" hierarchy="main" />
      </div>
      <div class="button-left">
        <Button @click="$emit('close')" name="Hủy" hierarchy="secondary" />
      </div>
    </template>
  </Form>
</template>

<script>
import Button from "../common/Button.vue";
import Combobox from '../common/Combobox.vue';
import Input from "../common/Input.vue";
import Form from "../template/Form.vue";
export default {
  name: "FixForm",
  emits: ["close"],
  components: {
    Form,
    Input,
    Button,
    Combobox
  },
  props: {},
  created() {},
};
</script>

<style lang="scss">
.form-content {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .form-input--merge {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .form-input {
    margin-bottom: 6px !important;
  }

  .form__information-basic {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 8px;
  }
}
.form-button {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin-top: 24px;

  .button-right {
    display: flex;
    gap: 4px;
  }
}
</style>
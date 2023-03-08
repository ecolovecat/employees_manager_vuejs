<template>
  <Form @close="$emit('close')">
    <template v-slot:content>
      <div class="form__information-basic">
        <div class="form-basic--left">
          <div class="form-input--merge form-input">
            <Input
              validate="['required']"
              ref="inputCode"
              :type="'text'"
              label="Mã"
              @inputValue="employeeData.test = $event"
              :value="employeeCode"
            />
            <Input validate="['required']" :type="'text'" label="Tên" />
          </div>
          <Combobox
            label="Đơn vị"
            class="combobox"
            value=""
            url="https://apidemo.laptrinhweb.edu.vn/api/v1/Departments"
            propValue="DepartmentID"
            propText="DepartmentName"
          />

          <div class="form-input">
            <Input :type="'text'" label="Chức danh" />
          </div>
        </div>
        <div class="form-basic--right">
          <div class="form-input--merge form-input">
            <Input
              type="date"
              validate="['birth']"
              label="Ngày sinh"
              @inputValue="employeeData.birth = $event"
            />

            <Input
              type="radio"
              label="Giới tính"
              radioName="gender"
              :radioOptions="[
                { label: 'Nam', value: 'Male' },
                { label: 'Nữ', value: 'Female' },
                { label: 'Khác', value: 'Other' },
              ]"
            />
          </div>
          <div class="form-input--merge form-input">
            <Input
              type="text"
              title="Số chứng minhn nhân dân"
              label="Số CMND"
            />
            <Input type="date" validate="['birth']" label="Ngày cấp" />
          </div>
          <div class="form-input">
            <Input type="text" label="Nơi cấp" />
          </div>
        </div>
      </div>

      <div class="form__information-other form-input">
        <div class="form-input">
          <Input type="text" label="Địa chỉ" />
        </div>
        <div class="form-input--merge form-input">
          <Input
            type="text"
            validate="['phone','required']"
            title="Điện thoại cố định"
            label="ĐT cố định"
          />
          <Input type="text" validate="['email']" label="Email" />
          <Input type="text" label="Tình trạng hôn nhân" />
        </div>
        <div class="form-input--merge">
          <Input type="text" label="Trình độ học vấn" />
          <Input type="text" label="Mã số thuế" />
          <Input type="text" label="Lương" />
        </div>
      </div>
    </template>
    <template v-slot:button>
      <div class="button-right">
        <Button name="Cất" hierarchy="secondary" />
        <Button name="Thêm và cất" @click="handleAdd" hierarchy="main" />
      </div>
      <div class="button-left">
        <Button @click="$emit('close')" name="Hủy" hierarchy="secondary" />
        <button ref="lastButton" id="button-hidden"></button>
      </div>
    </template>
  </Form>
</template>

<script>
import Button from "../common/Button.vue";
import Combobox from "../common/Combobox.vue";
import Input from "../common/Input.vue";
import Form from "../template/Form.vue";
import axios from "axios";
export default {
  name: "AddForm",
  emits: ["close"],
  components: {
    Form,
    Input,
    Button,
    Combobox,
  },
  data() {
    return {
      employeeCode: "",
      employeeData: {},
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  async beforeMount() {
    // get avaiable employee code
    axios
      .get(
        "https://apidemo.laptrinhweb.edu.vn/api/v1/Employees/NewEmployeeCode"
      )
      .then((response) => {
        this.employeeCode = response.data; // set the input value to the returned data
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(this.employeeCode);
  },
  async mounted() {
    this.$refs.lastButton.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        this.focusInput();
      }
    });
    // focus when open form
    this.focusInput();
  },
  methods: {
    /**
     * Add nhân viên
     * Trần Phương Duy
     */
    handleAdd() {
      console.log(111, this.$store.state.validationErrors);
      if (this.$store.state.validationErrors.length != 0) {
        const uniqueErrors = Object.fromEntries(
          [...new Set(Object.values(this.$store.state.validationErrors))].map(
            (value, index) => [index, value]
          )
        );
        console.log(uniqueErrors);
        this.$store.commit("showValidate", true);
        this.$store.commit("validationErrors", uniqueErrors)
      }
    },
    focusInput() {
      this.$nextTick(() => {
        const el = this.$refs.inputCode.$el.querySelector("input");
        console.log(el);
        if (el && typeof el.focus === "function") {
          el.focus();
        }
      });
    },
  },
  watch: {
    employeeData: {
      handler: function (newVal) {
        console.log(newVal.test);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
#button-hidden {
  background-color: #fff;
  outline: none;
  border: none;
}
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
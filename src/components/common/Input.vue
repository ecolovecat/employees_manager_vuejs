<template>
  <div class="input-wrapper">
    <label v-if="label">
      {{ label }}<span class="required" v-if="required"></span>
    </label>
    <!-- Input radio -->
    <div class="input__radio" v-if="type === 'radio'">
      <div
        class="input__radio-option"
        v-for="option in radioOptions"
        :key="option.value"
      >
        <input
          type="radio"
          :name="radioName"
          v-model="inputValue"
          :value="option.value"
        />
        <label>{{ option.label }}</label>
      </div>
    </div>
    <!-- Other input type -->
    <input
      :class="
        borderClass == ''
          ? ''
          : borderClass == 'valid'
          ? 'border-valid'
          : 'border-error'
      "
      v-else
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :style="{ width: inputWidth }"
      @blur="validateInput"
      @input="emitInputValue()"
    />
    <Icon v-if="iconName" :iconName="iconName" :iconSize="iconSize" />
  </div>
</template>

<script>
import Icon from "./Icon.vue";
import VALIDATEMESSAGE from "@/config/validate";
import emailValidate from "@/utils/email-valid-date";
import isVnPhonenumber from "@/utils/vn-phone-validate";
import isValidDob from "@/utils/is-valid-dob";
// import isValidDob from "@/utils/isValidDob";
export default {
  name: "InputPage",
  components: {
    Icon,
  },
  data() {
    return {
      inputValue: this.value || "",
      borderClass: "",
    };
  },
  props: {
    modelValue: {String, Number},
    validate: {
      type: [Array, String],
      default: () => [],
    },
    value: {
      default: "",
    },
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    iconName: {
      type: String,
      default: null,
    },
    iconSize: {
      type: String,
      default: "24",
    },
    inputWidth: String,
    radioName: {
      type: String,
      default: null,
    },
    radioOptions: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    required() {
      return this.validate.includes("required");
    },
  },
  mounted() {
  },
  methods: {
    /**
     * Truyền input value lên store
     * Trần Phương Duy
     */
    emitInputValue() {
      this.$emit('inputValue', this.inputValue)
      // this.$store.commit("inputValue", this.inputValue);
    },
    /**
     * Set màu cho border invalid
     * Trần Phương Duy
     */
    setValidationResult(isValid, errorMessage) {
      this.$el.title = isValid ? "" : errorMessage;
      this.borderClass = isValid ? "valid" : "error";
    },
    /**
     * Validte dữ liệu
     * Trần Phương Duy
     */
    validateInput() {
      try {
        let validationErrors = [];

        if (this.validate.length == 0) return;

        if (this.validate.includes("required")) {
          // validate required
          if (!this.inputValue.trim()) {
            validationErrors.push(VALIDATEMESSAGE.required.message);
          }
        }

        if (this.validate.includes("email")) {
          // validate email
          const email = this.inputValue.trim();
          if (!emailValidate(email)) {
            validationErrors.push(VALIDATEMESSAGE.email.message);
          }
        }

        if (this.validate.includes("phone")) {
          // validate phone
          const phone = this.inputValue.trim();
          if (!isVnPhonenumber(phone)) {
            validationErrors.push(VALIDATEMESSAGE.phone.message);
          }
        }

        if (this.validate.includes("birth")) {
          // validate date of birth
          const dateOfBirth = this.inputValue;
          if (!isValidDob(dateOfBirth)) {
            validationErrors.push(VALIDATEMESSAGE.birth.message);
          }
        }

        this.$store.commit("validationErrors", validationErrors[0]);
        if (validationErrors.length > 0) {
          this.setValidationResult(false, validationErrors[0]);
        } else {
          this.setValidationResult(true, "");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {},
};
</script>

<style lang="scss">
input[type="radio"]:checked {
  accent-color: green;
}
.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;

  .border-valid {
    border-color: green !important;
  }

  .border-error {
    border-color: red !important;
  }

  label {
    margin-bottom: 8px;
    display: inline-block;
    .required:before {
      content: "*";
      color: red;
    }
  }

  input {
    padding: 0px 12px;
    height: 32px;
    border: none;
    border: 1px solid rgb(176, 170, 170);
    border-radius: 4px;
    font-family: Roboto;
  }

  input:hover {
    background-color: #f6f6f6;
  }

  .input__radio {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;

    .input__radio-option {
      label {
        margin: 0px !important;
      }

      input {
        height: 20px !important;
        width: 20px !important;
      }
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  input:focus {
    outline: none;
    border-color: #50b83c;
    background-color: #ffffff;
  }

  .icon {
    position: absolute;
    top: 6px;
    right: 8px;
  }
}
</style>
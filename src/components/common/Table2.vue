<template>
  <div class="table">
    <div class="table__content">
      <table>
        <thead>
          <tr>
            <th>
              <input
                class="checkbox-button"
                @click="checkAll"
                :checked="isCheckAll"
                type="checkbox"
                name=""
                id=""
              />
            </th>
            <th v-for="(header, index) in headers" :key="index">
              {{ header.label }}
            </th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in filteredData" :key="index">
            <td>
              <input
                class="checkbox-button"
                type="checkbox"
                @click="checkHanlde"
                :checked="isCheck"
              />
            </td>
            <!-- note that the first index is with the key of the cell -->
            <td
              @dblclick="handleDoubleClick(row.EmployeeCode)"
              :class="headers[index].className"
              v-for="(cell, cellIndex, index) in row"
              :key="cellIndex"
            >
              {{ cell }}
            </td>
            <td class="table-function" @click="contextMenuHandle($event)">
              <div>Sửa</div>
              <div class="icon-down icon-24"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table__paginate">
      <div class="table__paginate-left">
        <p>
          Tổng số: <span class="bold"> {{ filteredData.length }} </span> bản ghi
        </p>
      </div>
      <div class="table__paginate-right">
        <p class="text">Số bản ghi trên trang</p>
        <div class="paginate-field">
          <div class="combo-box">
            <div class="combo-box-wrapper">
              <input
                v-model="pageSize"
                ref="paginateCombobox"
                @focus="comboboxShow = true"
                @blur="comboboxShow = false"
                type="text"
                class="combo-box-input"
                placeholder="Select an option..."
              />
              <Icon
                @click="comboboxHandle"
                iconName="icon-toggle"
                iconSize="24"
              />
            </div>
            <ul class="combo-box-options" v-if="comboboxShow">
              <li @click="pageSize = 10">10 bản ghi</li>
              <li @click="pageSize = 20">20 bản ghi</li>
              <li @click="pageSize = 50">50 bản ghi</li>
              <li @click="pageSize = 100">100 bản ghi</li>
            </ul>
          </div>
          <div class="paginate-record">
            {{ (pageNumber - 1) * pageSize + 1 }}-{{
              Math.min(pageNumber * pageSize, filteredPaginate.length)
            }}
            bản ghi
          </div>
          <div class="paginate-icon">
            <Icon
              v-if="pageNumber > 1"
              @click="pageNumber--"
              iconName="icon-left-arrow-enable"
              iconSize="24"
            />
            <Icon v-else iconName="icon-left-arrow-disable" iconSize="24" />
            <Icon
              v-if="pageNumber * pageSize < filteredPaginate.length"
              @click="pageNumber++"
              iconName="icon-right-arrow-enable"
              iconSize="24"
            />
            <Icon v-else iconName="icon-right-arrow-disable" iconSize="24" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="context-menu-wrapper"
    ref="contextMenu"
    v-click-outside="clickOutsideHandle"
  >
    <ContextMenu v-show="contextShow">
      <div class="context-menu-action">Nhân bản</div>
      <div
        @click="deleteEmployee"
        class="context-menu-action contex-action-delete"
      >
        Xóa
      </div>
      <div class="context-menu-action">Ngưng sử dụng</div>
    </ContextMenu>
  </div>
</template>

<script>
import Icon from "./Icon.vue";
import ContextMenu from "../template/ContextMenu.vue";
import axios from 'axios';
export default {
  name: "TablePage",
  emits: ["deleteEmployee", "doubleClick"],
  components: {
    Icon,
    ContextMenu,
  },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    apiUrl: String,
  },
  data() {
    return {
      comboboxShow: false,
      contextMenuShow: false,
      rows: [],
      datas: [],
      isCheck: false,
      isCheckAll: false,
      pageSize: 10,
      pageNumber: 1,
      filteredPaginate: [],
    };
  },
  // mounted() {
  //   this.handleDoubleClick()
  // },
  mounted() {
    // fetch data
    this.fetchData();
    this.fetchFilterData();
  },
  computed: {
    filteredData() {
      let searchTerm = this.$store.state.searchTerm;
      console.log(312312, searchTerm);
      if (!searchTerm) {
        return this.rows;
      }
      const term = searchTerm.toLowerCase();
      return this.rows.filter(
        (row) =>
          row.name.toLowerCase().includes(term) ||
          row.email.toLowerCase().includes(term)
      );
    },
    contextShow() {
      console.log("vlvll");
      return this.$store.state.contextShow;
    },
  },
  methods: {
    async fetchData() {
      try {
        this.$store.commit("loading", true);
        const res = await fetch(this.apiUrl);
        const datas = await res.json();
        if (datas) {
          this.$store.commit("loading", false);
          this.datas = datas;
        }

        datas.forEach((data) => {
          let row = {};
          this.headers.map((header) => {
            if (header.field == "DateOfBirth") {
              let temp = data[header.field];
              const dateObj = new Date(temp);
              const formattedDate = dateObj.toLocaleDateString("en-GB");
              row[header.field] = formattedDate;
            } else if (header.field == "Salary") {
              let temp = data[header.field];
              row[header.field] = isNaN(parseInt(temp).toLocaleString())
                ? parseInt(temp).toLocaleString()
                : "";
            } else row[header.field] = data[header.field] || "Không xác định";
          });
          this.rows.push(row);
        });
      } catch (e) {
        this.$store.commit("loading", false);
        console.log(1222, e);
      }
    },
    async fetchFilterData() {
      axios
        .get(
          "https://apidemo.laptrinhweb.edu.vn/api/v1/Employees/employeeFilter",
          {
            params: {
              pageSize: this.pageSize,
              pageNumber: this.pageNumber,
            },
          }
        )
        .then((response) => {
          this.filteredPaginate = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteEmployee() {
      this.$emit("deleteEmployee");
    },
    handleDoubleClick(employeeCode) {
      let data = {};

      let employee = this.datas.find((obj) => obj.EmployeeCode == employeeCode);

      for (let key in employee) {
        data[key] = employee[key];
      }
      this.$store.commit("fixData", data);
      this.$emit("doubleClick", data);
    },
    comboboxHandle() {
      this.comboboxShow = true;
      this.$refs.paginateCombobox.focus();
    },
    contextMenuHandle() {
      try {
        this.$store.commit("contextShow", true);
      } catch (error) {
        console.log(error);
      }
    },
    clickOutsideHandle() {
      this.contextMenuShow = false;
    },
    checkAll() {
      this.isCheck = !this.isCheck;
    },
    checkHanlde() {
      this.isCheckAll = false;
      console.log(this.isCheckAll);
    },
  },
  watch: {
    pageSize: function () {
      this.fetchData();
    },
    pageNumber: function () {
      this.fetchData();
    },
  },
};
</script>
<style lang="scss" scoped>
.table-align {
  text-align: center !important;
}
.number {
  text-align: right !important;
}
.table-text {
  text-align: left !important;
}
.table {
  position: relative;
  height: 100%;
  .table__content {
    overflow: scroll;
    max-height: calc(100% - 56px);
    position: relative;

    table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 20px;
      table-layout: auto;
      width: 100%;
      white-space: nowrap;

      th,
      td {
        max-height: 48px;
        min-height: 48px;
        width: auto;
        border: 1px solid #e0e0e0;
        text-align: left;
        padding: 8px;
        column-width: auto;
        vertical-align: middle;
      }

      th {
        border-top: none;
        border-bottom: none;
        background-color: #f5f5f5;
        position: sticky;
        top: 0;
        left: 0;
      }

      th:last-child {
        position: sticky;
        z-index: 2;
        right: 0px;
      }

      td:last-child {
        /* min-width: 100px !important; */
        border-top: none;
        position: sticky;
        right: 0px;
        background-color: #fff;
      }

      td:nth-child(1) {
        position: sticky;
        left: -0px;
        border-left: none;
        background-color: #f5f5f5;
      }
      th:nth-child(1) {
        position: sticky;
        left: -0px;
        z-index: 3;
        border-left: none;
        background-color: #f5f5f5;
      }

      td:nth-child(2) {
        position: sticky;
        left: 46px;
        background-color: #f5f5f5;
        border-right: 1px dotted #bdbdbd;
      }
      th:nth-child(2) {
        position: sticky;
        left: 46px;
        z-index: 3;
        background-color: #f5f5f5;
        border-right: 1px dotted #bdbdbd;
      }

      tr {
        background-color: #fff;
        font-size: 14px;
      }

      tr:hover {
        background-color: #f8f8f8;
      }
    }
  }

  .table__paginate {
    position: absolute;
    background-color: #f5f5f5;
    height: 56px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;

    .table__paginate-right {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

    .paginate-field {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;

      .paginate-icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.table-function {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0075c0;
  position: relative;
}

.context-menu-wrapper {
  position: absolute;
  border: 1px solid #e0e0e0;
  color: black;
  background: #fff;
  right: 50px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: visible;
}

.combo-box {
  position: relative;
}

.combo-box-wrapper {
  position: relative;

  .icon-toggle {
    position: absolute;
    right: 8px;
    top: 7px;
  }
}
.combo-box input {
  height: 36px;
  border: none;
  border: 1px solid #e6e6e6;
  border-radius: 3px 0px 0px 3px;
  border-right: none;
  padding: 0px 8px;
}

.combo-box input:focus {
  border-color: #5dc748;
}

.combo-box ul {
  position: absolute;
  list-style-type: none;
  top: -430%;
  right: 0px;
  left: 0px;
  border-radius: 4px;
  box-shadow: 0px 4px 16px rgba(23, 27, 42, 0.24);
  padding: 8px;
  background-color: #fff;
  max-height: 308px;
}

.combo-box ul > li {
  height: 36px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
}

.combo-box ul > li:hover {
  background-color: rgba(80, 184, 60, 0.1);
}

.combo-box-wrapper {
  display: flex;
}

.table-text {
}
</style>
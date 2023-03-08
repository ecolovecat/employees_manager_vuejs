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
            <th
              :title="header.tooltip || ''"
              v-for="(header, index) in headers"
              :key="index"
            >
              {{ header.label }}
            </th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in filteredData"
            v-show="
              index < recordsPerPage * currentPage &&
              index > (currentPage - 1) * recordsPerPage
            "
            :key="index"
          >
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
            <td
              class="table-function"
              @click="contextMenuHandle($event, row.EmployeeCode, index)"
            >
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
                ref="paginateCombobox"
                @focus="comboboxShow = true"
                type="text"
                class="combo-box-input"
                placeholder="Select an option..."
                v-model="selectedOption"
              />
              <Icon
                @click="comboboxHandle"
                iconName="icon-toggle"
                iconSize="24"
              />
            </div>
            <ul class="combo-box-options" v-if="comboboxShow">
              <li
                @click="
                  selectOption('10 bản ghi');
                  recordsPerPage = 10;
                "
              >
                10 bản ghi
              </li>
              <li
                @click="
                  selectOption('20 bản ghi');
                  recordsPerPage = 20;
                "
              >
                20 bản ghi
              </li>
              <li
                @click="
                  selectOption('50 bản ghi');
                  recordsPerPage = 50;
                "
              >
                50 bản ghi
              </li>
              <li
                @click="
                  selectOption('100 bản ghi');
                  recordsPerPage = 100;
                "
              >
                100 bản ghi
              </li>
            </ul>
          </div>
          <div class="paginate-record">
            {{ currentPage }}-{{
              parseInt(filteredData.length / recordsPerPage) + 1
            }}
            bản ghi
          </div>
          <div class="paginate-icon">
            <Icon
              iconName="icon-left-arrow-disable"
              v-show="currentPage == 1"
              iconSize="24"
            />
            <Icon
              v-show="currentPage != 1"
              iconName="icon-left-arrow-enable"
              iconSize="24"
              @click="prePage"
            />
            <Icon
              v-show="
                currentPage ==
                parseInt(filteredData.length / recordsPerPage) + 1
              "
              iconName="icon-right-arrow-disable"
              iconSize="24"
              @click="nextPage"
            />
            <Icon
              v-show="
                currentPage !=
                parseInt(filteredData.length / recordsPerPage) + 1
              "
              iconName="icon-right-arrow-enable"
              iconSize="24"
              @click="nextPage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="context-menu-wrapper"
    :style="{
      top: contextMenuPosition.y + 'px',
      left: contextMenuPosition.x + 'px',
    }"
    ref="contextMenu"
    v-show="contextShow"
  >
    <ContextMenu>
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
// import removeVnese from "../../utils/remove-vnese-tones"
export default {
  name: "TablePage",
  emits: ["doubleClick"],
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
      filteredData: [],
      datas: [],
      isCheck: false,
      isCheckAll: false,
      contextMenuPosition: { x: 0, y: 0 },
      totalrecord: 0,
      selectedOption: "10 bản ghi",
      deletedId: "",
      recordsPerPage: 10,
      currentPage: 1,
      deletingIndex: null,
      deleting: false,
    };
  },
  updated() {},
  async mounted() {
    // fetch data
    document.addEventListener("click", this.handleOutsideClick);
    this.fetchData();
    console.log(123123, this.$store.state.searchTerm);
    this.filteredData = this.rows;
    this.handleSearch();
    // console.log('fadfd',await this.rows);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  computed: {
    /**
     * Truyền dữ liệu ở ô tìm kiếm
     * Trần Phương Duy
     */
    // filteredData() {

    //   let searchTerm = this.$store.state.searchTerm;
    //   searchTerm = removeVnese(searchTerm)
    //   console.log(searchTerm);
    //   if (!searchTerm) {
    //     return this.rows;
    //   }
    //   return this.rows;
    // },
    /**
     * Hiện context
     * Trần Phương Duy
     */
    contextShow() {
      return this.$store.state.contextShow;
    },
    clickDelete() {
      return this.$store.state.clickDelete;
    },
  },
  methods: {
    nextPage() {
      if (
        this.currentPage <
        parseInt(this.filteredData.length / this.recordsPerPage) + 1
      ) {
        this.$store.commit("loading", true);
        setTimeout(() => {
          this.currentPage++;
          this.$store.commit("loading", false);
        }, 1000);
      }
    },
    prePage() {
      if (this.currentPage > 1) {
        this.$store.commit("loading", true);
        setTimeout(() => {
          this.$store.commit("loading", false);
          this.currentPage--;
        }, 500);
      }
    },
    async handleSearch() {
      try {
        console.log(this.$store.state("searchTerm"));
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Handle if click out side the edit action or outside the context menu, if yes, not show the context menu
     * Modified by Tran Phuong Duy 3/3/2023
     */
    handleOutsideClick(event) {
      const target = event.target;
      const contextMenu = this.$refs.contextMenu;

      // check if target or parent target contain table-function, which is on the context of last td, and check if target in context menu
      if (
        !target.parentElement.classList.contains("table-function") &&
        !target.classList.contains("table-function") &&
        !contextMenu.contains(target)
      ) {
        this.$store.commit("contextShow", false);
      }
    },
    /**
     * Chọn option phân trang
     * Trần Phương Duy
     */
    selectOption(option) {
      this.$store.commit("loading", true);
      setTimeout(() => {
        this.$store.commit("loading", false);
        this.currentPage = 1;
        this.comboboxShow = false;

        this.selectedOption = option;
      }, 500);
    },
    /**
     * Fetch data
     * Trần Phương Duy
     */
    async fetchData() {
      try {
        this.$store.commit("loading", true);
        const res = await fetch(this.apiUrl);
        const datas = await res.json();
        if (datas) {
          this.$store.commit("loading", false);
          this.datas = datas;
          console.log(datas[0]);
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
        // console.log(this.rows[0]);
      } catch (e) {
        this.$store.commit("loading", false);
        console.log(1222, e);
      }
    },
    deleteEmployee() {
      this.deleting = false;
      this.$store.commit("contextShow", false);
      let eId = this.deletedId;
      this.$store.commit("eId", eId);
      this.$store.commit("deleteDialogShow", true);
    },

    /**
     * handle double click
     * {employeeCode} trường employee code
     * Trần Phương Duy
     */
    async handleDoubleClick(employeeCode) {
      try {
        this.$store.commit("loading", true);
        let data = {};
        // Get the object that is clicked
        let employee = this.datas.find(
          (obj) => obj.EmployeeCode == employeeCode
        );

        // Call the api to get that object infomation
        let employeeId = employee.EmployeeId;
        const res = await fetch(
          "https://apidemo.laptrinhweb.edu.vn/api/v1/Employees/" + employeeId
        );

        employee = await res.json();
        this.$store.commit("loading", false);
        // assign data to push to the store
        for (let key in employee) {
          data[key] = employee[key];
        }
        this.$store.commit("fixData", data);
        this.$emit("doubleClick", data);
      } catch (e) {
        console.log(e);
        this.$store.commit("loading", false);
      }
    },
    /**
     * Handle combobox
     * Trần Phương Duy
     */
    comboboxHandle() {
      this.comboboxShow = true;
      this.$refs.paginateCombobox.focus();
    },
    /**
     * check trong context menu
     * Trần Phương Duy
     */
    contextMenuHandle(event, eId, index) {
      try {
        this.$store.commit("contextShow", true);
        this.contextMenuPosition = { x: event.clientX - 150, y: event.clientY };

        // Get the object that is clicked
        let employee = this.datas.find((obj) => obj.EmployeeCode == eId);

        this.deletedId = employee.EmployeeId;
        console.log(this.deletedId);
        this.deletingIndex = index;
        // const resDelete = await fetch('https://apidemo.laptrinhweb.edu.vn/api/v1/Employees/' + employeeId, {method: 'DELETE'});

        // employee = await resDelete.json()
        // console.log(employee);

        // Get direction of poiter x and y, then set to top and right of the context menu appearance, then set to the data contextMenuPosition
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * check khi click bên ngoài context
     * Trần Phương Duy
     */
    clickOutsideHandle() {
      this.contextMenuShow = false;
    },
    /**
     * check tất cả
     * Trần Phương Duy
     */
    checkAll() {
      this.isCheck = !this.isCheck;
    },
    /**
     * check khi ấn nút kết quả
     * Trần Phương Duy
     */
    checkHanlde() {
      this.isCheckAll = false;
      console.log(this.isCheckAll);
    },
  },
  watch: {
    clickDelete: {
      handler: function () {
        if (!this.deleting) {
          this.$store.commit("clickDelete", false);
          this.rows.splice(this.deletingIndex, 1);
          this.deleting = true;
        }
      },
      deep: true,
    },
    "$store.state.searchTerm": function (newVal) {
      console.log(newVal);
      //   try {
      //     let searchTerm = this.$store.state.searchTerm;
      //     searchTerm = removeVnese(searchTerm);
      //     console.log(searchTerm);
      //     const res = await fetch(
      //       "https://apidemo.laptrinhweb.edu.vn/api/v1/Employees/" + employeeId
      //     );

      //     if (!searchTerm) {
      //       return this.rows;
      //     }
      //     return this.rows;
      //   } catch (error) {
      //     console.log(error);
      //   }
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
        right: -2px;
        border-right: none;
      }

      td:last-child {
        /* min-width: 100px !important; */
        border-top: none;
        position: sticky;
        right: -2px;
        background-color: #fff;
        border-right: none;
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

      td:nth-child(3) {
        position: sticky;
        left: 140px;
        background-color: #f5f5f5;
        border-right: 1px dotted #bdbdbd;
      }
      th:nth-child(3) {
        position: sticky;
        left: 140px;
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
  max-width: 160px;
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
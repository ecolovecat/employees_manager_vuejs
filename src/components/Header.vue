<template>
  <div class="header__left">
    <div class="header-icon">
      <IconPicker iconName="icon-menu" iconSize="24" />
    </div>
    <div class="header-logo">
      <img
        src="@/assets/Resource/img/Logo_Module_TiengViet_White.66947422.svg"
        alt=""
        class="img-logo"
      />
    </div>
  </div>
  <div class="header__right">
    <div class="header__branch">
      <IconPicker iconName="icon-select" iconSize="24" />
      <div class="header__branch-name text">Công ty Misa</div>
      <div class="icon-toggle icon-24 menu-icon"></div>
    </div>
    <div class="header__account">
      <div class="icon-notification icon-24"></div>
      <div class="account__profile">
        <img
          src="@/assets/Resource/img/default-avatar.jpg"
          alt=""
          class="img-avata"
        />
        <div class="profile-name">Trần Phương Duy</div>
        <div class="icon-toggle icon-24" @click="setContext"></div>
        <div class="context-menu-wrapper">
          <ContextMenu v-show="contextShow">
            <div class="context-menu-action">
              <IconPicker iconName="icon-history"/>
              <div>
                Lịch sử
              </div>
            </div>
            <div class="context-menu-action contex-action-delete">
              <IconPicker iconName="icon-setting"/>
              <div>
                Cài đặt
              </div>
            </div>
            <div class="context-menu-action">
              <IconPicker iconName="icon-logout"/>
              <div>
                Đăng xuất
              </div>
            </div>
          </ContextMenu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconPicker from "./common/Icon.vue";
import ContextMenu from "./template/ContextMenu.vue";
export default {
  name: "PageHeader",
  components: {
    IconPicker,
    ContextMenu,
  },
  data() {
    return {
      contextShow: ''
    }
  },
  methods: {
    /**
     * Set dữ liệu
     * Trần Phương Duy
     */
    setContext() {
      this.contextShow = !this.contextShow
    }
  }
};
</script>

<style lang="scss">
.header {
  display: flex;
}
.header-logo {
  display: flex;
  align-items: center;
  img {
    height: 36px;
    cursor: pointer;
  }
}

.header__left {
  height: 100%;
  width: 200px;
  background-color: #393a3d;
  display: flex;
  align-items: center;

  .header-icon {
    margin: 0px 16px;
  }
}

.header__right {
  display: flex;
  align-items: center;
  height: 100%;
  width: calc(100% - 200px);
  justify-content: space-between;
  padding: 0px 16px;

  .header__branch {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  .header__account {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    .account__profile {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      position: relative;

      .img-avata {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid rgb(233, 225, 225);
        cursor: pointer;
      }

      .context-menu-wrapper {
        position: absolute;
        z-index: 300;
        top: 24px;
        right: 0px;
      }
    }
  }
}
</style>
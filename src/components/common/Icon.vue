<template>
  <div :class="['icon' ,iconName, 'icon-' + iconSize]"></div>
</template>

<script>
export default {
  name: "IconPicker",
  props: {
    iconName: String,
    iconSize: {
      type: String,
      default: '24'
    },
  },
  data() {
    return {
      
    }
  },
  created() {
  }
};
</script>

<style>
.icon-24 {
  width: 24px;
  height: 24px;
  padding: 2px;
  cursor: pointer;
}

.icon-16 {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.icon-36 {
  width: 36px;
  height: 36px;
  cursor: pointer;
}

.icon-menu {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -425px -88px;
}

.icon-select {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -845px -32px;
}

.icon-search {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -990px -358px;
}

.icon-toggle {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -1124px -357px;
}

.icon-notification {
  padding: 0px !important;
  height: 24px !important;
  width: 24px !important;
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -787px -30px;
}

.icon-refresh {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -1097px -89px;
}

.icon-dashboard {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -31px -1630px;
}

.icon-cash {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -202px -146px;
}

.icon-cashin {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -259px -147px;
}

.icon-buy {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -147px -258px;
}

.icon-bill {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -1211px -90px;
}

.icon-storage {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -1714px -90px;
}

.icon-tool {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -676px -30px;
}

.icon-asset {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -202px -146px;
}

.icon-tax {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -732px -31px;
}

.icon-price {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -202px -146px;
}

.icon-sell {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -1098px -90px;
}

.icon-down {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -892px -355px;
}

.icon-danger {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -593px -145px;
}

.icon-success {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -990px -462px;
}

.icon-exit {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -1178px -362px;
}

.icon-question {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -89px -145px;
}

.icon-exit-36 {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -147px -145px;
}

.icon-dropbox {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -900px -365px;
}

.icon-noti {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -832px -462px;
}

.icon-alert {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -752px -462px;
}

.icon-success-24 {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -1602px -258px;
}

.icon-left-arrow-enable {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -29px -356px;
}

.icon-left-arrow-disable {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -29px -404px;
}

.icon-right-arrow-enable {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -77px -356px;
}

.icon-right-arrow-disable {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -77px -404px;
}
.icon-history {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -648px -145px;
}
.icon-setting {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -676px -30px;
}
.icon-logout {
  background: url("@/assets/Resource/img/Sprites.64af8f61.svg") no-repeat -259px -147px;
}
</style>
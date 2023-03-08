<template>
  <div>
    <div class="menu-icon">
      <div class="icon-dashboard icon-24"></div>
    </div>
    <div class="text">Tổng quan</div>
  </div>
  <div>
    <div class="menu-icon">
      <div class="icon-cash icon-24"></div>
    </div>
    <div class="text">Tiền mặt</div>
  </div>
  <div>
    <div class="menu-icon">
      <div class="icon-cashin icon-24"></div>
    </div>
    <div class="text">Tiền gửi</div>
  </div>
  <div>
    <div class="menu-icon">
      <div class="icon-buy icon-24"></div>
    </div>
    <div class="text">Mua hàng</div>
  </div>
  <div>
    <div class="menu-icon">
      <div class="icon-sell icon-24"></div>
    </div>
    <div class="text">Bán hàng</div>
  </div>
  <div>
    <div class="menu-icon">
      <div class="icon-bill icon-24"></div>
    </div>
    <div class="text">Quản lý hóa đơn</div>
  </div>
  <div>
    <div class="menu-icon">
      <div class="icon-tool icon-24"></div>
    </div>
    <div class="text">Công cụ dụng cụ</div>
  </div>
  <div>
    <div class="menu-icon">
      <div class="icon-asset icon-24"></div>
    </div>
    <div class="text">Tài sản cố định</div>
  </div>

  <div>
    <div class="menu-icon">
      <div class="icon-price icon-24"></div>
    </div>
    <div class="text">Giá thành</div>
  </div>
  <div>
    <div class="menu-icon">
      <div class="icon-select icon-24"></div>
    </div>
    <div class="text">Tổng hợp</div>
  </div>
  <div>
    <div class="menu-icon">
      <div class="icon-select icon-24"></div>
    </div>
    <div class="text">Ngân sách</div>
  </div>
  <div>
    <div class="menu-icon">
      <div class="icon-select icon-24"></div>
    </div>
    <div class="text">Báo cáo</div>
  </div>
  <div>
    <div class="menu-icon">
      <div class="icon-select icon-24"></div>
    </div>
    <div class="text">Phân tích tài chính</div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {},
};
</script>

<style>
.sidebar {
  background-color: #393a3d;
  padding-top: 14px;
}

.sidebar > div {
  display: flex;
  height: 44px;
  align-items: center;
  padding: 0px 12px;
  cursor: pointer;
}

.sidebar > div {
  padding-bottom: 4px;
}

.sidebar > div:hover {
  background-color: #58595d;
}

.sidebar .text {
  color: #fff;
}

.menu-icon {
  display: flex;
  align-items: center;
  color: #fff;
  margin-right: 12px;
}
</style>
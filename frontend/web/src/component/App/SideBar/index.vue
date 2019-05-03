<template>
  <Menu :active-name="activeItem" theme="dark" width="auto">
    <div class="logoContainer">
      <span>海舍民宿后台管理系统</span>
    </div>
    <MenuGroup title="常用管理">
      <MenuItem name="usermanager" to="/usermanager">
        <Icon type="md-document"/>用户管理
      </MenuItem>
      <MenuItem name="shop" to="/shop">
        <Icon type="md-chatbubbles"/>
        门店管理
      </MenuItem>
    </MenuGroup>
    <!-- <MenuGroup title="统计分析">
      <MenuItem name="3">
        <Icon type="md-heart"/>用户留存
      </MenuItem>
      <MenuItem name="4">
        <Icon type="md-leaf"/>流失用户
      </MenuItem>
    </MenuGroup> -->
  </Menu>
</template>

<script>
export default {
  name: "Sider",

  data() {
    return {
      activeItem: 'shop'
    };
  },
  methods: {
    initMenu() {
      this.activeItem = location.hash.slice(2)
      console.log(this.activeItem);
    },
  },
  computed: {},
  mounted() {
    this.initMenu()
  }
};
</script>

<style scoped>
.logoContainer {
  color: #fff;
  font-weight: 500;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
</style>

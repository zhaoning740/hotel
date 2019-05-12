<style scoped>
.navContainer {
  text-align: right;
}
</style>
<template>
  <div class="navContainer">
    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" icon="ios-person"/>
    <Dropdown style="margin-left: 20px" @on-click="clickItem">
      <a href="javascript:void(0)" style="font-size: 13px">
        admin
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <!-- <DropdownItem name="center">个人中心</DropdownItem> -->
        <DropdownItem name="logout">退出</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    clickItem(name) {
      if (name === "logout") {
        this.$router.replace("/login");
      }
    }
  }
};
</script>

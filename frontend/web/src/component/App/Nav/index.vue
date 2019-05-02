<style scoped>
  .navContainer{
    text-align: right
  }
</style>
<template>
  <div class="navContainer">
    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" icon="ios-person" />
    <Dropdown style="margin-left: 20px">
      <a href="javascript:void(0)" style="font-size: 13px">
        名字
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>个人中心</DropdownItem>
        <DropdownItem>退出</DropdownItem>
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
  computed: {}
};
</script>

<template>
  <div>
    <div class="buttonContainer">
      <!-- <Button type="primary" to="/user/create">新增用户</Button> -->
    </div>
    <Table border :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
import R from '@/request';

export default {
  name: "Test",

  data() {
    return {
      columns: [
        {
          title: '订单编号',
          key: "ordernum",
        },
        {
          title: "联系人",
          key: "name"
        },
        {
          title: "联系方式",
          key: "phone"
        },
        {
          title: "入住时间",
          key: "starttime"
        },
        {
          title: "结束时间",
          key: "endtime"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "订单状态",
          key: "status"
        },
        {
          title: "金额",
          key: "money"
        },
      ],
      data: []
    };
  },
  computed: {},
  methods: {
    fetchList() {
      R.post('/user/userList')
      .then(res => {
        if(res.data && Array.isArray(data)) {
          this.data = res.data;
        }
      })
    },
    show(index) {
      this.$Modal.info({
        title: "用户详情",
        content: `test`
      });
    },
    remove(index) {
      this.data.splice(index, 1);
    },
  },
  mounted() {
    this.fetchList()
  }
};
</script>

<style scoped>
.buttonContainer{
  text-align: right;
  margin-bottom: 10px;
}
</style>

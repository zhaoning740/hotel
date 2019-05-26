<template>
  <div>
    <div class="buttonContainer">
      <!-- <Button type="primary" to="/user/create">新增用户</Button> -->
    </div>
    <Table :loading="loading" border :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
import R from '@/request';

export default {
  name: "Test",

  data() {
    return {
      loading: false,
      columns: [
        {
          title: '订单编号',
          key: "id",
        },
        {
          title: "下单客户",
          key: "account"
        },
        {
          title: "联系方式",
          key: "phone"
        },
        {
          title: "入住时间",
          key: "checkintime"
        },
        {
          title: "结束时间",
          key: "checkouttime"
        },
        {
          title: "天数",
          key: "day"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "订单状态",
          key: "status",
          render: (h, params) => {
            if(params.row.state === 0) {
              return h('span', '未使用');
            } else {
              return h('span', '已使用');
            }       
          }
        },
        {
          title: "支付金额(￥)",
          key: "money"
        },
        {
          title: '评价',
          key: 'content',
        }
      ],
      data: []
    };
  },
  computed: {},
  methods: {
    fetchList() {
      this.loading = true;
      R.post('/order/list', {})
      .then(res => {
        if(res.data && Array.isArray(res.data)) {
          this.data = res.data;
        }
      })
      .finally(() => {
        this.loading = false;
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

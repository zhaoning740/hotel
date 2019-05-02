<template>
  <div>
    <div class="buttonContainer">
      <Button type="primary" to="/shop/create">新增门店</Button>
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
          title: '门店名称',
          key: "username",
        },
        {
          title: "联系电话",
          key: "phone"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.id);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data: []
    };
  },
  computed: {},
  methods: {
    fetchList() {
      R.post('/good/shopList')
      .then(res => {
        if(res.data && Array.isArray(data)) {
          this.data = res.data;
        }
      })
    },
    show(index) {
      this.$Modal.info({
        title: "门店详情",
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

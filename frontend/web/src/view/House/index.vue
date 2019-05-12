<template>
  <div>
    <div class="buttonContainer">
      <Button type="primary" to="/house/create">新增房源</Button>
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
          title: '地区',
          key: "area",
        },
        {
          title: "房源类型",
          key: "type",
          maxWidth: 100,
        },
        {
          title: "房源户型",
          key: "layout",
          render: (h, params) => {
            const param = JSON.parse(params.row.layout || '{}');
            return h("div", [
              h(
                "span",
                `${param.room || 0}卧室 · ${param.bed || 0}床 · ${param.bathroom || 0}卫生间 · 最多住${param.people || 0}人`
              )
            ]);
          }
        },
        {
          title: "价格(￥)",
          key: "price",
          maxWidth: 120,
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
                      this.$router.push('/house/detail?id=' + params.row.id);
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
                      this.remove(params);
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
      this.loading = true;
      R.post('/good/list')
      .then(res => {
        console.log('good/list',res);
        if(res.data && Array.isArray(res.data)) {
          this.data = res.data.map(item => ({
            id: item.id,
            area: item.area,
            price: item.price,
            type: item.goodType,
            layout: item.goodHType,
            address: item.address
          }));
        }
      }).finally(() => this.loading = false)
    },
    show(index) {
      this.$Modal.info({
        title: "用户详情",
        content: `test`
      });
    },
    remove(params) {
      R.get(`good/del/${params.row.id}`).then(res => {
        if (res.success) {
          this.$Message.success("删除成功!");
          this.fetchList();
        }
      })
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

<template>
  <div>
    <div class="buttonContainer">
      <Button type="primary" to="/user/create">新增用户</Button>
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
          title: '用户名',
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
      this.loading = true;
      R.post('/user/userList')
      .then(res => {
        if(res.data && Array.isArray(data)) {
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

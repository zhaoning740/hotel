<template>
  <div>
    <div class="buttonContainer">
      <Button type="primary" to="/house/create">新增房源</Button>
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
          title: '地区',
          key: "area",
        },
        {
          title: "房源类型",
          key: "type"
        },
        {
          title: "房源户型",
          key: "layout"
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
      data: [
        {
          id: 55,
          area: "北京",
          type: "独立公寓",
          layout: "1卧室·1床·1卫生间·限制2人",
          address: "北京市海淀区肖家河新村东区"
        },
         {
          id: 2,
          area: "天津",
          type: "花园洋房",
          layout: "12卧室·2床·1卫生间·限制4人",
          address: "天津市河北区xxx路xx号"
        },
         {
          id: 3,
          area: "石家庄",
          type: "普通住宅",
          layout: "3卧室·3床·2卫生间·限制6人",
          address: "石家庄市裕华区红旗大街"
        },
         {
          id: 4,
          area: "北京",
          type: "独立公寓",
          layout: "2卧室·2床·1卫生间·限制4人",
          address: "北京市海淀区肖家河新村东区"
        },
         {
          id: 5,
          area: "重庆",
          type: "独栋别墅",
          layout: "8卧室·8床·3卫生间·限制30人",
          address: "重庆xxx区xx路"
        },
      ]
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

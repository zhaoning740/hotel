<template>
  <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="80">
    <FormItem label="地区" prop="area">
      <Cascader :data="formItem.area" size="large" trigger="hover"></Cascader>
    </FormItem>
    <FormItem label="房源类型" prop="type">
      <Select v-model="formItem.type" clearable style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </FormItem>
    <FormItem label="房源户型" prop="layout">
      <Row>
          <Col span="1" style="text-align:right;">
           卧室
          </Col>
          <Col span="4">
            <Input v-model="formItem.phone" placeholder="请输入卧室数"></Input>
          </Col>
          <Col span="1" style="text-align:right;">
           床
          </Col>
          <Col span="4">
            <Input v-model="formItem.phone" placeholder="请输入床数"></Input>
          </Col>
          <Col span="2" style="text-align:right;">
           卫生间
          </Col>
          <Col span="4">
            <Input v-model="formItem.phone" placeholder="请输入卫生间数"></Input>
          </Col>
          <Col span="2" style="text-align:right;">
           限住人数
          </Col>
          <Col span="4">
            <Input v-model="formItem.phone" placeholder="请输入限住人数"></Input>
          </Col>
      </Row>
    </FormItem>
    <FormItem label="门店地址" prop="address">
      <Input v-model="formItem.address" placeholder="请输入门店地址"></Input>
    </FormItem>
    <FormItem label="门店信息" prop="info">
      <Input v-model="formItem.info" placeholder="请输入信息"></Input>
    </FormItem>
    <FormItem label="详细信息" prop="detailinfo">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="详细信息" :maxlength=200></Input>
    </FormItem>
    <FormItem label="门店图片" prop="picture">
      <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
          <img :src="item.url">
          <div class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
      <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="/user/uploadFile"
        style="display: inline-block;width:58px;"
      >
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <Modal title="View Image" v-model="visible">
        <img
          :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
          v-if="visible"
          style="width: 100%"
        >
      </Modal>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="onSubmit('formValidate')">提交</Button>
      <Button style="margin-left: 8px" @click="cancle()">取消</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      formItem: {
        area: [{
            value: 'beijing',
            label: '北京',
            children: [
                {
                    value: 'gugong',
                    label: '故宫'
                },
                {
                    value: 'tiantan',
                    label: '天坛'
                },
                {
                    value: 'wangfujing',
                    label: '王府井'
                }
            ]
        }, {
            value: 'jiangsu',
            label: '江苏',
            children: [
                {
                    value: 'nanjing',
                    label: '南京',
                    children: [
                        {
                            value: 'fuzimiao',
                            label: '夫子庙',
                        }
                    ]
                },
                {
                    value: 'suzhou',
                    label: '苏州',
                    children: [
                        {
                            value: 'zhuozhengyuan',
                            label: '拙政园',
                        },
                        {
                            value: 'shizilin',
                            label: '狮子林',
                        }
                    ]
                }
            ],
        }],
        type: '',
        textarea: 'kajsdbvljbkjbvkjbl',
        address: "",
        info:'jbkjb'
      },
      cityList: [
            {
                label: '独立公寓',
                value: 'apartment'
            },
            {
                label: '花园洋房',
                value: 'gardenhouse'
            },
            {
                label: '普通住宅',
                value: 'normal'
            },
            {
                label: '独栋别墅',
                value: 'villa'
            }
        ],
      ruleValidate: {
        area: [
          {
            required: true,
            message: "请选择地区",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择房源类型",
            trigger: "blur"
          }
        ],
        layout: [
          {
            required: true,
            message: "请选择房源户型",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入门店地址",
            trigger: "blur"
          }
        ],
        info: [
          {
            required: true,
            message: "请输入门店信息",
            trigger: "blur"
          }
        ],
        detailinfo: [
          {
            required: true,
            message: "请输入门店详细信息",
            trigger: "blur"
          }
        ],
        picture: [
          {
            required: true,
            message: "请上传图片",
            trigger: "blur"
          }
        ],
      },
      defaultList: [
        {
          name: "a42bdcc1178e62b4694c830f028db5c0",
          url:
            "https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"
        },
        {
          name: "bc7521e033abdd1e92222d733590f104",
          url:
            "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
        }
      ],
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  created: function () {
    console.log(this.$route,111111111111111111,this.$route.params.pathMatch)
    if(this.$route.params.pathMatch == 'detail'){

      this.fetchDetail(this.$route.query.id);
    }

  },
  mounted: function () {
    
  },
  methods: {
    onSubmit(name) {
      console.log("onSubmit===>", this.formItem);
      console.log("refs===>", this.$refs);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    cancle() {
      console.log(this);
      this.$router.back();
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },
    handleOpen () {
        this.visible = true;
    },
    handleClose () {
        this.visible = false;
    },
    fetchDetail(id){
      console.log("fetch" + id)
    }
  }
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
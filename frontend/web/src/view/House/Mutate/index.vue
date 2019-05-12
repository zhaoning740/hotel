<template>
  <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="120">
    <FormItem label="地区">
      <Cascader :data="areaList" size="large" trigger="hover" v-model="formItem.area"></Cascader>
    </FormItem>
    <FormItem label="价格">
      <Input v-model="formItem.price" placeholder="请输入价格"></Input>
    </FormItem>
    <FormItem label="起始日期" prop="time">
      <DatePicker v-model="formItem.timeRange" format="yyyy年MM月dd日" type="daterange" placeholder="请选择" style="width: 400px"></DatePicker>
    </FormItem>
    

    <FormItem label="房源类型" prop="type">
      <Select v-model="formItem.type" clearable style="width:200px">
        <Option v-for="item in cityList" :value="item.label" :key="item.value">{{ item.label }}</Option>
      </Select>
    </FormItem>
    <FormItem label="房源户型" prop="layout">
      <Row>
        <Col span="1" style="text-align:right;">卧室</Col>
        <Col span="4">
          <Input v-model="formItem.room" placeholder="请输入卧室数"></Input>
        </Col>
        <Col span="1" style="text-align:right;">床</Col>
        <Col span="4">
          <Input v-model="formItem.bed" placeholder="请输入床数"></Input>
        </Col>
        <Col span="2" style="text-align:right;">卫生间</Col>
        <Col span="4">
          <Input v-model="formItem.bathroom" placeholder="请输入卫生间数"></Input>
        </Col>
        <Col span="2" style="text-align:right;">限住人数</Col>
        <Col span="4">
          <Input v-model="formItem.people" placeholder="请输入限住人数"></Input>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="房源地址" prop="address">
      <Input v-model="formItem.address" placeholder="请输入房源地址"></Input>
    </FormItem>
    <FormItem label="房源信息" prop="info">
      <Input v-model="formItem.info" placeholder="请输入信息"></Input>
    </FormItem>
    <FormItem label="详细信息" prop="detailInfo">
      <Input
        v-model="formItem.detailInfo"
        type="textarea"
        :autosize="{minRows: 2,maxRows: 5}"
        placeholder="详细信息"
        :maxlength="200"
      ></Input>
    </FormItem>
    <FormItem label="房源展示图片" prop="picture">
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
          :src="imgUrl + imgName"
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
import R from "@/request";
import FormatDate from "@/date";

export default {
  data() {
    return {
      imgUrl: 'http://y7v2pw.natappfree.cc/user/image/',
      areaList: [
          {
            value: "北京",
            label: "北京",
            children: [
              {
                value: "故宫",
                label: "故宫"
              },
              {
                value: "天坛",
                label: "天坛"
              },
              {
                value: "王府井",
                label: "王府井"
              }
            ]
          },
          {
            value: "江苏",
            label: "江苏",
            children: [
              {
                value: "南京",
                label: "南京",
                children: [
                  {
                    value: "夫子庙",
                    label: "夫子庙"
                  }
                ]
              },
              {
                value: "苏州",
                label: "苏州",
                children: [
                  {
                    value: "拙政园",
                    label: "拙政园"
                  },
                  {
                    value: "狮子林",
                    label: "狮子林"
                  }
                ]
              }
            ]
          }
        ],
      //表单数据
      formItem: {
        userid: '', // 用户id，从localstorage中获取
        area: [],
        price: "",
        timeRange: [],
        starttime: '',
        endtime: '',
        type: "",
        address: "",
        info: "",
        detailInfo: "",
        room: 0,
        bed: 0,
        bathroom: 0,
        people: 0,
      },
      cityList: [
        {
          label: "独立公寓",
          value: "apartment"
        },
        {
          label: "花园洋房",
          value: "gardenhouse"
        },
        {
          label: "普通住宅",
          value: "normal"
        },
        {
          label: "独栋别墅",
          value: "villa"
        }
      ],
      ruleValidate: {
        area: [
          {
            // required: true,
            message: "请选择地区",
            trigger: "blur"
          }
        ],
        price: [
          {
            // required: true,
            message: "请填写价格",
            trigger: "change"
          }
        ],
        starttime: [
          {
            // required: true,
            message: "请填起始时间",
            trigger: "blur"
          }
        ],
        endtime: [
          {
            // required: true,
            message: "请填写结束时间",
            trigger: "blur"
          }
        ],
        type: [
          {
            // required: true,
            message: "请选择房源类型",
            trigger: "blur"
          }
        ],
        layout: [
          {
            // required: true,
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
            // required: true,
            message: "请输入门店信息",
            trigger: "blur"
          }
        ],
        detailInfo: [
          {
            required: true,
            message: "请输入门店详细信息",
            trigger: "blur"
          }
        ],
        picture: [
          {
            // required: true,
            message: "请上传图片",
            trigger: "blur"
          }
        ]
      },
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: []
    };
  },
  created: function() {
    if (this.$route.params.pathMatch == "detail") {
      this.fetchDetail(this.$route.query.id);
    }
  },
  mounted: function() {
    const userId = window.localStorage.getItem('ID');
    if (userId) {
      console.log('getUserId===>', userId)
      this.formItem.userid = userId;
    }
  },
  methods: {
    onSubmit(name) {
      console.log("onSubmit===>", this.formItem);
      const param = {
        userid: window.localStorage.getItem('ID'),
        descKey: this.formItem.info,
        describet: this.formItem.detailInfo,
        price: this.formItem.price,
        area: this.formItem.area.join('/'),
        goodType: this.formItem.type,
        starttime: FormatDate.dateToString(this.formItem.timeRange[0]),
        endtime: FormatDate.dateToString(this.formItem.timeRange[1]),
        goodHType: JSON.stringify({
          room: this.formItem.room,
          bed: this.formItem.room,
          bathroom: this.formItem.bathroom,
          people: this.formItem.people,
        }),
        address: this.formItem.address,
        picture: this.uploadList.map(item => item.name)
      }
      if (this.$route.params.pathMatch == "detail") {
        param.id = this.$route.query.id;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.$Message.success("Success!");
          this.submitCreate(param)
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    cancle() {
      this.$router.back();
    },
    submitCreate(params = this.formItem) {
      this.$Spin.show();
      R.post("/good/insert", { ...params }).then(res => {
        this.$Spin.hide();
        if (res.success) {
          this.$Message.success("操作成功");
          this.$router.replace("/housemanager");
        }
      }).finally(() => {
        this.$Spin.hide();
      });
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
      console.log('upload==>', res, file, this.$refs.upload.fileList)
      if (res.success) {
        file.url = this.imgUrl+ res.data;
        file.name = res.data;
      }
      this.uploadList = this.$refs.upload.fileList;
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
    handleOpen() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    },
    fetchDetail(id) {
      this.$Spin.show();
      R.get(`/good/detail/${id}`).then(res => {
        this.$Spin.hide();        
        if(res.success) {
          if (res.data.picture && Array.isArray(res.data.picture)) {
            this.uploadList = res.data.picture.map(item => ({
              name: item,
              url: this.imgUrl + item,
              status: 'finished',
            }))
          }
          const parseGoodsLayout = JSON.parse(res.data.goodHType);
          this.formItem = {
            id: res.data.id,
            detailInfo: res.data.describet,
            price: res.data.price,
            area: res.data.area.split('/'),
            room: parseGoodsLayout.room,
            bed: parseGoodsLayout.bed,
            bathroom: parseGoodsLayout.bathroom,
            people: parseGoodsLayout.people,
            type: res.data.goodType,
            address: res.data.address,
            timeRange: [res.data.starttime, res.data.endtime],
          }
        }
      }).finally(() => {
        this.$Spin.hide();
      })
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
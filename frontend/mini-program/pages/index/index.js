//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const R = require('../../utils/request.js')

Page({
  data: {
    showModal: false,
    /** swiper */
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    circular: true,
    /** timeRange */
    showBeginTime: '选择起始日期',
    showEndTime:'选择结束日期',
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    currentDateEnd: new Date().getTime() + 24 * 60 * 60 * 1000,
    minDateEnd: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    /** banner */
    bannerList: [{
        url: '/pages/product/index?id=557',
        banner_img: '/images/3.jpg'
      },
      {
        url: '/pages/product/index?id=1',
        banner_img: '/images/4.jpg'
      }
    ],
    /** 地区选择 */
    areaShow:'选择目的地或城市',
    /** Q: 能放到常量里？？ */
    areaList:{
      province_list: {
        110000: '北京市',
        120000: '天津市'
      },
      city_list: {
        110100: '北京市',
        110200: '县',
        120100: '天津市',
        120200: '县'
      },
      county_list: {
        110101: '东城区',
        110102: '西城区',
        110105: '朝阳区',
        110106: '丰台区',
        120101: '和平区',
        120102: '河东区',
        120103: '河西区',
        120104: '南开区',
        120105: '河北区',
      }
    },
    proList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onSearch: function() {
    const param = {
      address: this.data.areaShow !== '选择目的地或城市' ? this.data.areaShow : null,
      checkintime: this.data.showBeginTime !== '选择起始日期' ? (this.data.showBeginTime + ' 00:00:00') : null,
      checkouttime: this.data.showEndTime !== '选择结束日期' ? (this.data.showEndTime + ' 23:59:59') : null
    }
    this.fetchGoodList(param)
  },
  //选择起始时间
  startTime() {
    this.setData({
      showStart: true
    })
  },
  onCancel() {
    this.setData({
      showStart: false
    })
  },
  onConfirm(event) {
    this.setData({
      currentDate: event.detail,
      showStart: false,
      currentDateEnd: event.detail + 24 * 60 * 60 * 1000,
      minDateEnd: event.detail + 24*60*60*1000,
      showBeginTime: util.formatUnixtime(event.detail)
    });
  },
  //选择结束日期
  endTime() {
    this.setData({
      showEnd: true
    })
  },
  onCancelEnd(){
    this.setData({
      showEnd: false
    })
  },
  onConfirmEnd(event){
    this.setData({
      currentDateEnd: event.detail,
      showEnd: false,
      showEndTime: util.formatUnixtime(event.detail)
    });
  },
  // 地区选择
  chooseArea(){
    this.setData({
      showArea: true
    })
  },
  onCancelArea(){
    this.setData({
      showArea: false
    })
  },
  onConfirmArea(event){
    this.setData({
      area: event.detail.values,
      areaShow: event.detail.values[2].name,
      showArea: false
    })
  },
  // 跳转详情页
  tapProInfo(e) {
    const id = e.currentTarget.id;
    const url = '/pages/product/product?id=' + id;
    wx.navigateTo({
      url,
    })
  },

  onLoad: function() {

  },
  onShow: function() {
    this.fetchGoodList()
  },
  /** 请求商品列表 */
  fetchGoodList(data = {}) {
    var _this = this
    R.request({
      url: '/good/list',
      method: 'post',
      data: data,
      success: (res) => {
        if(Array.isArray(res.data)) {
          const list = res.data.map(item => ({
            ...item,
            picture: (Array.isArray(item.picture) && item.picture.map(i => (app.globalData.apiUrl + app.globalData.imgUrl + i))) || ['/images/1.jpg'],
          }))
          _this.setData({
            proList: list
          })
        }
      }
    })
  },

})
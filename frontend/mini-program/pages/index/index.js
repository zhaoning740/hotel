//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

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
        banner_img: 'http://static.heyjuice.cn/Public/banner/20181227153119_qt_banner.jpg'
      },
      {
        url: '/pages/product/index?id=1',
        banner_img: 'http://static.heyjuice.cn/Public/banner/20190212150726_qt_banner.jpg'
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
    proList: [
      {
        id: 1,
        desc: '独立房间·1卧1床1卫',
        adress: '安德里北街地铁+限女生+吃货天堂+独立公寓',
        image: 'http://static.heyjuice.cn/Public/Wap/images/9_03.jpg',
        money: 189
      },
      {
        id: 2,
        desc: '独立公寓·2卧2床1卫',
        adress: '西局地铁口XX大厦北行560m',
        image: 'http://static.heyjuice.cn/Public/Wap/images/2_520_21.jpg',
        money: 268
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onSearch: () => {
    const that = this;
    wx.request({
      url: app.globalData.apiUrl + '/good/shopList',
      data: {},
      success: (res) => {
        console.log('onSearch==>', res)
      }
    })
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
  // 允许授权
  onGotUserInfo(e){
    app.globalData.showLoginModal = false;
    this.setData({
      showModal: app.globalData.showLoginModal
    })
  },

  onLoad: function() {

  },
  onShow: function() {
    // 授权
    this.setData({
      showModal: app.globalData.showLoginModal
    })
    // app.ready().then(() => {
    //   this.callFun()
    // }).catch()
    this.callFun()
  },
  callFun() {
    var _this = this

  },

})
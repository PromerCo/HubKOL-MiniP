import { My } from 'my-model.js';
// var my = new My(); //实例化 首页 对象
// Page({
//   /**
//    * 页面的初始数据
//    */
//   data: {
//     hasUserInfo: false,
//     isHide: false,
//     showDialog: false,
//     phoneNumber:'',
//     userInfo:[]
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function () {
//     var that = this;
//   },
//   setDisabled:function(){
//     wx.getSetting({
//       success(res) {
//         if (res.authSetting['scope.userInfo']) {
//         } else {
//           wx.navigateTo({
//             url: '/pages/login/login'
//           })
//         }
//       }
//     })
//   },
//   //包括敏感数据在内的完整用户信息的加密数据,需要解密  session_key   openid
//   getPhoneNumber:function(e){
//     var that = this
//     //获取用户手机号
//     var errMsg = e.detail.errMsg
//     var msg    = e.detail
//     wx.login({
//       success: function (res) {
//         msg.code = res.code
//         if (errMsg == 'getPhoneNumber:ok') {
//           my.getPhone(msg, (data) => {
//             if (data.code == 200) {
//               var data = JSON.parse(data.msg);
//               that.setData({
//                 phoneNumber: data.phoneNumber
//               })
//             }
//           })

//         }
//       }
//     })




//   },
//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
//     var that = this
//     wx.getSetting({
//       success(res) {
//         if (res.authSetting['scope.userInfo']) {
//           wx.getUserInfo({
//             success: function (res) {
//               var userInfo = res.userInfo
//               that.setData({
//                 userInfo: userInfo
//               })
//             }
//           })
//           that.setData({
//             isHide: false
//           })
//         } else {
//           that.setData({
//             isHide: true
//           })
//         }
//       }
//     })
//     console.log(that.data.userInfo)
//   },
var app = getApp()
import {citys} from './city.js';
Page({
  data: {
    temp: [],
    isShow_01: false,
    listData_01: [
      ['广告组', '网红组']
    ],
    picker_01_data: ['广告组'],

    isShow_03: false,
    listData_03: [
      ['广告', '传媒', '市场', '运营'],
      ['媒体投放', '品牌公关', '媒介经理', '市场推广',
        '产品推广', '新媒体运营', '电商运营', '活动运营', '网络推广'
      ]
    ],
    picker_03_data: [],

    isShow_08: false,
    defaultPickData_08: [{
      code: '500000'
    }, {
      code: '500200'
    }, {
      code: '500243'
    }],
    listData_08: citys,
    picker_08_data: [],

    isShow_09: false,
    defaultPickData_09: [{
      code: '500000'
    }, {
      code: '500200'
    }, {
      code: '500243'
    }],
    listData_09: citys,
    picker_09_data: [],
    // 平台
    isShow_02: false,
    listData_02: [
      ['抖音达人', '快手达人', '哔哩达人', '美拍达人', '秒拍达人',
        '火山达人', '西瓜达人'
      ]
    ],
    picker_02_data: [],
  },
  onLoad() {
    setTimeout(() => {
      this.setData({
        defaultPickData_08: [{
          code: '110000'
        }, {
          code: '110100'
        }, {
          code: '110101'
        }]
      })
    }, 3000)
  },
  showPicker_01: function(e) {
    this.setData({
      isShow_01: true
    })
  },
  sureCallBack_01(e) {
    let data = e.detail
    console.log(JSON.stringify(e.detail.choosedIndexArr))
    this.setData({
      isShow_01: false,
      picker_01_data: e.detail.choosedData,
      picker_01_index: JSON.stringify(e.detail.choosedIndexArr),

    })
  },
  // 监听取消事件
  cancleCallBack_01(e) {
    this.setData({
      isShow_01: false,
    })
  },
  // 行业
  showPicker_03: function() {
    this.setData({
      isShow_03: true
    })
  },
  sureCallBack_03(e) {
    let data = e.detail
    this.setData({
      isShow_03: false,
      picker_03_data: e.detail.choosedData,
      picker_03_index: JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_03() {
    this.setData({
      isShow_03: false,
    })
  },
  // 城市 
  showPicker_08: function() {
    this.setData({
      isShow_08: true
    })
  },
  sureCallBack_08(e) {
    console.log(JSON.stringify(e.detail.choosedIndexArr))
    this.setData({
      isShow_08: false,
      picker_08_data: e.detail.choosedData,
      picker_08_index: JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_08() {
    this.setData({
      isShow_08: false,
    })
  },

  showPicker_09: function() {
    this.setData({
      isShow_09: true
    })
  },
  sureCallBack_09(e) {
    console.log(JSON.stringify(e.detail.choosedIndexArr))
    this.setData({
      isShow_09: false,
      picker_09_data: e.detail.choosedData,
      picker_09_index: JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_09() {
    this.setData({
      isShow_08: false,
    })
  },
  // 平台
  showPicker_02: function(e) {
    this.setData({
      isShow_02: true
    })
  },
  sureCallBack_02(e) {
    let data = e.detail
    console.log(JSON.stringify(e.detail.choosedIndexArr))
    this.setData({
      isShow_02: false,
      picker_02_data: e.detail.choosedData,
      picker_02_index: JSON.stringify(e.detail.choosedIndexArr),

    })
  },
  // 监听取消事件
  cancleCallBack_02(e) {
    this.setData({
      isShow_02: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
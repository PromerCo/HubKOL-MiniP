import { citys } from './city.js';
var app = getApp();
import { Release } from 'release-model.js';

var util = require('../../utils/util.js')
var release = new Release(); //实例化 首页 对象

Page({
  /**
   * 页面的初始数据
   */
  data: {
    temp: [],
    // 平台
    isShow_02: false,
    isShow_03:false,
    findex:0,
    index:1,
    pindex:0,
    number:['1','5','10','20','50','100','200','500'],
    logo:"/img/platform-100001.png",
    tag: [], //标签
    fans: [], //粉丝
    ploform: [],//平台
    platfrom_code: 100001,
    lang: 'zh_CN',
    isShow_09: false,
    //默认城市code码
    defaultPickData_09: [
      { code: '500000' }, { code: '500200' }, { code: '500243' }
    ],
    listData_09: citys,
    picker_09_data: [],
    date: util.formatTime(new Date()),
    value1: [],
    displayValue1: '请选择',
    isHidePlaceholder: false,
    tid_s:[]
  },

  onLoad:function(){
    var that = this
    //标签
    var tags = wx.getStorageSync('record').tages
    //粉丝
    var fans = wx.getStorageSync('record').fans
    //平台
    var ploform = wx.getStorageSync('record').ploform
    ploform.splice(0, 1);
    that.setData({
      tag: tags,
      fans: fans,
      ploform: ploform
    })
  },


/*
切换平台
*/
  bindCheckplatform(e) {
    var that = this

    that.setData({
      pindex: e.detail.value
    })
  },

  onConfirm:function(e){
    var that = this
    that.setData({
      displayValue1: e.detail.displayValue[0] + e.detail.displayValue[1] + e.detail.displayValue[2],
      expire_time: e.detail.label
    })
  },
  //日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  getTextareaInput: function (e) {
    var that = this;
    if (e.detail.cursor > 0) {
      that.setData({
        isHidePlaceholder: true
      })
    } else {
      that.setData({
        isHidePlaceholder: false
      })
    }
  },

/*
   粉丝量
*/
  bindCheckfollow(e){
     var that = this
     that.setData({
       findex: e.detail.value
     })
  },

  // 平台
  showPicker_02: function () {
    console.log(123)
    this.setData({
      isShow_02: true
    })
  },
  
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  sureCallBack_02(e) {
    var that = this
    let data = e.detail
    var listPt = this.data.listPt
    var z_index = e.detail.choosedIndexArr[0]
    var tte = this.data.listData_03
    that.setData({
      isShow_02: false,
      picker_02_data: e.detail.choosedData,
      picker_02_index: JSON.stringify(e.detail.choosedIndexArr),
      platfrom_code: that.data.listData_pt[z_index],
      logo: listPt[z_index]['logo'],
    })
  },
  check:function(e){
    var that  = this
    var t_id  = e.currentTarget.dataset.id
    var tags  = this.data.tag
    var index =   e.currentTarget.dataset.index
    var tid_s = that.data.tid_s;
    var chek = tags[index];
    if (chek['check'] == 'check'){
    chek['check'] = 'none'
    for (var i = 0; i < tid_s.length; i++) {
        if (tid_s[i] == t_id) {
              tid_s.splice(i, 1);
          }
    }

    that.setData({
      tid_s: tid_s
    })
    }else{
        chek['check']  = 'check' 
        tid_s.push(t_id)
        that.setData({
          tid_s: tid_s
        })
    }

    console.log(tags)
    console.log(tid_s)


    that.setData({
      tag: tags,
      tid_s: tid_s
    })
  },

  // 监听取消事件
  cancleCallBack_02(e) {
    this.setData({
      isShow_02: false,
    })
  },

  formSubmit: throttle(function (e) {

    var tid_s = this.data.tid_s
    var tid = tid_s.join(',');
    var info = e.detail.value
    if (info.title == null || info.title == undefined || info.title==''){
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
      return false
    } else if (info.budget == null || info.budget == undefined || info.budget == ''){
      wx.showToast({
        title: '人均消费不能为空',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
      return false
    } else if (tid == null || tid == undefined || tid == '') {
      wx.showToast({
        title: '领域不能为空',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
      return false
    } else if (info.convene == null || info.convene == undefined || info.convene == '') {
      wx.showToast({
        title: '召集人数不能为空',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
      return false
    } else if (info.describe == null || info.describe == undefined || info.describe == '') {
      wx.showToast({
        title: '简介不能为空',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
      return false
    } else if (info.expire_time == null || info.expire_time == undefined || info.expire_time == '') {
      wx.showToast({
        title: '过期时间不能为空',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
      return false
    } else if (info.follow_level == null || info.follow_level == undefined || info.follow_level == '') {
      wx.showToast({
        title: '粉丝量不能为空',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
      return false
    }

    info.tags = tid

    release.kolSave(info, (data) => {
    var data = JSON.parse(data);
     if (data.code == 201){
       info.id = data.data.push_id    //ID
       info.nick_name = data.data.nick_name
       info.avatar_url = data.data.avatar_url

       /*
       跳转 ME 页面
       */
       wx.redirectTo({
         url: '../../pages/sign/sign',
       })
  
     } else if (data.code == 412){


       wx.showToast({
         title: '请先完善资料',
         icon: 'none',
         duration: 1000,
         mask: true,
       })
     }

    })
  }, 1000),
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})



function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null
  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

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
    findex:1,
    listData_02: [
      ['抖音','快手', '哔哩', '美拍', '秒拍','西瓜', '火山', '微博'],
    ],
    logo:"/img/platform-100001.png",
    listPt:[
        { 'logo': '/img/platform-100001.png', 'title': '抖音' },
        { 'logo': '/img/platform-100002.png', 'title': '快手' },
        { 'logo': '/img/platform-100002.png', 'title': '哔哩' },
        { 'logo': '/img/platform-100002.png', 'title': '美拍' },
        { 'logo': '/img/platform-100002.png', 'title': '秒拍' },
        { 'logo': '/img/platform-100002.png', 'title': '西瓜' },
        { 'logo': '/img/platform-100002.png', 'title': '火山' },
        { 'logo': '/img/platform-100002.png', 'title': '微博' },
    ],
    tag: [
      { 'id': 1, 'title': '小姐姐'},
      { 'id': 2, 'title': '小哥哥' },
      { 'id': 3, 'title': '明星' },
      { 'id': 4, 'title': '萌娃' },
      { 'id': 5, 'title': '夫妻情侣'},
      { 'id': 6, 'title': '老外'},
      { 'id': 7, 'title': '搞笑' },
      { 'id': 8, 'title': '剧情'},
      { 'id': 9, 'title': '宠物'},
      { 'id': 10, 'title': '时尚' },
      { 'id': 11, 'title': '美妆'},
      { 'id': 12, 'title': '美食'},
      { 'id': 13, 'title': '旅游'},
      { 'id': 14, 'title': '游戏'},
      { 'id': 15, 'title': '娱乐'}
    ],
    array: [
      { 'id': '100001','title': '1万以下'},
      { 'id': '100002', 'title': '1万-5万'},
      { 'id': '100003', 'title': '6万-10万' },
      { 'id': '100004', 'title': '11万-20万' },
      { 'id': '100005', 'title': '21万-50万' },
      { 'id': '100006', 'title': '51万-1百万' },
      { 'id': '100007', 'title': '1百万-2百万' },
      { 'id': '100008', 'title': '2百万-5百万' },
      { 'id': '100009', 'title': '5百万-1千万' },
      {'id': '100010', 'title': '一千万以上' },
      ],
    listData_pt: [
      100001, 100002, 100003, 100004, 100005, 100006, 100007, 100008
    ],
    platfrom_code: 100001,

    picker_02_data: ['抖音'],
    // 城市
    isShow_09: false,
    defaultPickData_09: [
      { code: '500000' }, { code: '500200' }, { code: '500243' }
    ],
    listData_09: citys,
    picker_09_data: [],
    date: util.formatTime(new Date()),
    value1: [],
    displayValue1: '请选择',
    lang: 'zh_CN',
    tid_s:[]
  },

  onLoad: function () {


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



  formSubmit:function(e){

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

       info.id = data.data    //ID
       info.nick_name = wx.getStorageSync('userInfo').nickName
       info.avatar_url = wx.getStorageSync('userInfo').avatarUrl

       if (info.avatar_url == null || info.avatar_url==undefined){
         wx.showToast({
           title: '请先授权',
           icon: 'none',
           duration: 1000,
           mask: true,
         })
         return false;
       }
       if (info.nick_name == null || info.nick_name == undefined) {
         wx.showToast({
           title: '请先授权',
           icon: 'none',
           duration: 1000,
           mask: true,
         })
         return false;
       }
       info.platform_title = info.platform
       info.push_title = info.title
       info.bystander_number = 0    //围观人数
       info.convene = info.convene    //剩余名额 
       info.enroll_number = 0    //入伍人数
       info.enroll = null       //json
       info.logo   = this.data.logo //logo
       info.is_enroll = 0 //是否报名 （0 报名  1未报名）  
       info.create_time = '刚刚'
       var pages = getCurrentPages(); // 获取页面栈
       var currPage = pages[pages.length - 1]; // 当前页面
       var prevPage = pages[pages.length - 2]; // 上一个页面
       var prevlist = prevPage.data.list
       prevlist.unshift(info)

       console.log(prevlist)

       prevPage.setData({
         list: prevlist   // 上一页数据
       })
       wx.navigateBack({
         delta: 1
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
  },
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
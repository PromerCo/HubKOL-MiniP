import { citys } from './city.js';
var app = getApp();
import { Release } from 'release-model.js';

var util = require('../../utils/util.js')

require('../../utils/editor.js')
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
    index:2,
    pindex:0,
    number:['1','5','10','20','50','100','200','500'],
    expenses: ['100', '300', '500', '1000', '3000', '5000', '10000', '50000','100000'],
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
    displayValue1: '请先选择',
    isHidePlaceholder: false,
    tid_s:[],
    mg_index:3,
    //editor组件
    formats: {},
    readOnly: false,
    placeholder: '活动介绍...',
    editorHeight: 300,
    keyboardHeight: 0,
    details:'',
    url: app.globalData.url,
    isIOS: false
  },

  onLoad:function(){


    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS })
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height

    })

    var tags = wx.getStorageSync('record').tages
    console.log(tags)
    
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
/*
截至时间
*/
  onConfirm:function(e){
    console.log(e.detail.label)
    var that = this
    that.setData({
      displayValue1: e.detail.displayValue[0] + e.detail.displayValue[1] + e.detail.displayValue[2],
      expire_time: e.detail.label
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
  //费用预算
  bindPickerfg: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      mg_index: e.detail.value
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
      if (tid_s.length >= 3) {
        wx.showToast({
          title: "最多选择三个标签哦",
          icon: 'none',
          duration: 800,
          mask: true
        });
        return false;
      }

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


  formSubmit: throttle(function (e) {

    var that = this;

    var describe = that.data.details;

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
    } else if (describe == null || describe == undefined || describe == '') {
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

    info.describe = describe


    release.kolSave(info, (data) => {
    var data = JSON.parse(data);
      console.log(data)

      
     if (data.code == 201){
       info.id = data.data.push_id    //ID
       info.nick_name = data.data.nick_name
       info.avatar_url = data.data.avatar_url

       /*
       跳转 ME 页面
       */
       wx.redirectTo({
         url: '../../pages/sign/sign?type=2',
       })
  
     } else if (data.code == 412){

       wx.showToast({
         title: '请先完善资料',
         icon: 'none',
         duration: 1000,
         mask: true,
       })
     } else if (data.code == 415) {

       //跳转HUB
       var message=[];
       message.type = 1
       wx.navigateTo({
         url: '../../pages/material/material?message=' + JSON.stringify(message),
       })

     }


    })
  }, 1000),


/*
文本组件
*/
  updatePosition(keyboardHeight) {
    const toolbarHeight = 100
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },

  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context

    }).exec()
  },

  bindinput: function (e) {

    var that = this
    var info = e.detail.html
    console.log(info)
    
    that.setData({
      details: info
    })
  },

  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    console.log(e)
    let { name, value } = e.target.dataset
    if (!name) return


    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    console.log(formats)

    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },

  insertImage() {
    const that = this
    wx.chooseImage({
      count: 9,
      success: function (res) {
      var image = res.tempFilePaths[0]; 
      var url = that.data.url
   
      wx.uploadFile({
        url: url+"/v1/alioss/index",
        filePath: image,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json'
        },
        success: function (res) {
          console.log(res.data)

          that.editorCtx.insertImage({
            src: res.data,
            data: {
              id: 'abcd',
              role: 'god'
            },
            width: '100%',
            success: function (e) {
              console.log(e)

            }
          })

        }

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
    var that = this;
    let pages = getCurrentPages(); //页面栈
    let prevPage = pages[pages.length - 2]; //上一页页面
    prevPage.setData({
      swatch: 1
    });
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

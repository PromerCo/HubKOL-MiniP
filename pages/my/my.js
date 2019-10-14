import { My } from 'my-model.js';
var my = new My();
var app = getApp(); 

Page({
  data: {
    index: 0,
    temp: [],
    showList:false,
    picker_01_index:0,
    isShow_01: false,
    hasUserInfo: false,
    showDialog: false,
    phoneNumber:'',
    userInfo:[],
    multiIndex: [0, 0],
    label:true,
    column_title: '参与的通告',
    follow_title:'关注的KOL',
    listData_01: [
      ['通告', 'KOL']
    ],
    isShow_03: false,
    multiArray: [
      ['广告', '传媒', '市场', '运营'],
      ['媒体投放', '品牌公关', '媒介经理']
    ],
    userInfo: [],
    picker_08_data: [],
    loadingHidden: false,
    isShow_09: false,
    picker_09_data: [],
    isShow_02: false,
    findex: 1,
    isShow_03: false,
    message:[],
    position:false,  //职位
    type:1,
    status:0,
    counter_img:'../../imgs/toolbar/sms@-kol.png',
    counter_mark:'通告',
    hub_icon:'/imgs/icon/edit.png',



  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            authHidding:true,
            loadingHidden:true
          })
        }else{
          that._loadData();
        }
      }
    })
  },

  bindGetUserInfo: function (e) {
    var that = this
    var userInfo = e.detail.rawData
    that.setData({
      loadingHidden:false
    })    
    wx.setStorageSync('userInfo', e.detail.userInfo)
    my.getUserAhth(userInfo, (data) => {
      var data = JSON.parse(data);
      if (data.code == 201) {
        that._loadData();
        that.setData({
          userInfo: JSON.parse(userInfo),
          authHidding: false,
          loadingHidden: true,
          status: 0
        })
      } else {
        that.setData({
          userInfo: JSON.parse(userInfo),
          authHidding: false,
          loadingHidden: true,
          status: 0
        })
        wx.showToast({
          title: '授权失败',//提示文字
          duration: 500,//显示时长
          mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
          icon: 'none', //图标，支持"success"、"loading"  
        })
      }

    });
  },

/*
获取用户授权
*/

  authLogin: throttle(function (e) {
    wx.navigateTo({
      url: '../../pages/login/login',
    })
  }, 1000),
  
  /*
  身份切换
  */
  sureCallBack_01: throttle(function (e) {
    var that = this
    var type = e.currentTarget.dataset.type
    if (type == undefined || type == null || type == 0){
        type = 1;
    }
    console.log(type)
    that.setData({
      loadingHidden:false,
      presentation: '正在切换'
    })

    my.blockedOut(type, (data) => {

      var data = JSON.parse(data); 

      
      if (data.code == 201){
        if (data.data.type == 1) {
          var counter_mark = 'Hub'
          var column_title = '发布的Hub'
          var hub_icon = "/imgs/icon/edit.png"
          var follow_title = '关注的KOL'
          var type = 2
          var counter_img = "../../imgs/toolbar/sms@-hub.png";
          var status = data.data.status
        } else {
          var counter_mark = 'KOL'
          var column_title = '参与的Hub'
          var follow_title = '关注的Hub'
          var type = 1;
          var hub_icon = "/imgs/icon/send.png"
          var counter_img = "../../imgs/toolbar/sms@-kol.png";
          var status = data.data.status
        }
        
        console.log(data.data)
        that.setData({
          counter_mark: counter_mark,
          counter_img: counter_img,
          column_title: column_title,
          follow_title: follow_title,
          message: data.data,
          loadingHidden:true,
          type: type,
          hub_icon: hub_icon,
          status: status
        })
      }else{
        that.setData({
          message: '',
        })
    
      }
    })

  }, 1000),



  // 我的账号
  account() {
    wx.navigateTo({
      url: '../../pages/account/account',
    })
  },
  // 我报名的栏目
  sign:function() {
    let type = this.data.type;
    console.log(type)

    wx.navigateTo({
      url: '../../pages/sign/sign?type=' + type,
    })
  },

  //关注的达人
  follow: function (e) {

    wx.navigateTo({
      url: '../../pages/follow/follow',
    })

  },
  //商务通讯录
  service: function (e) {
    console.log('通讯录')
  },

  edit_data:function(e){
    var that  = this;
    that.setData({
      showList: false,
    })

  },
  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this
   var userInfo = wx.getStorageSync('userInfo'); 

      //let message = wx.getStorageSync('HubKol');
      //if (message == '' || message == null || message == undefined){
      my.roleStatus((data) => {

      var data = JSON.parse(data);
     
      if (data.code == 201) {
          // wx.setStorageSync('HubKol', data.data);
          if (data.data.type == 1) {
            //HUB
            var type = 2   
            var counter_mark = 'HUB'
            var column_title = '发布的Hub'
            var counter_img = '../../imgs/toolbar/sms@-hub.png'
            var hub_icon = "/imgs/icon/send.png"
          } else {
            
            //KOL
            var type = 1
            var counter_mark = 'KOL'
            var column_title = '参与的Hub'
            var counter_img = '../../imgs/toolbar/sms@-kol.png'
            var hub_icon = "/imgs/icon/edit.png"
          }

          data.data['wx_name'] = data.data['wechat']

          //已填写资料
          that.setData({
            type: type,
            message: data.data,
            status: data.data.status,
            counter_img: counter_img,
            label: false,
            position: true,//职位
            picker_02_data: data.data.platform,
            userInfo: userInfo,
            loadingHidden:true,
            hub_icon: hub_icon,
            column_title: column_title
          })
        }
      })

  },

  material:function(e){
    var that    = this
    var message = that.data.message
    var type    = e.currentTarget.dataset.type

    
    if(message  == ""){
      var  message = [];
      message.type = type;
    }


    if (!message['wx_name']){
      message['wx_name'] = message['wechat']
    }

  
    var message = JSON.stringify(message)


 
 
    //跳转
    wx.navigateTo({
      url: '../../pages/material/material?message=' + encodeURIComponent(message),
    })

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
   onShow: function () {
     
    var that = this

     that.setData({
       message: that.data.message
     })
  
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
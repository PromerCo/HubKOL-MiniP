// pages/my/my.js
var app = getApp();
import { My } from 'my-model.js';
var my = new My(); //实例化 首页 对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    isHide: false,
    showDialog: false,
    phoneNumber:'',
    userInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
  },
  setDisabled:function(){
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
        } else {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  //包括敏感数据在内的完整用户信息的加密数据,需要解密  session_key   openid
  getPhoneNumber:function(e){
    var that = this
    //获取用户手机号
    var errMsg = e.detail.errMsg
    var msg    = e.detail
    wx.login({
      success: function (res) {
        msg.code = res.code
        if (errMsg == 'getPhoneNumber:ok') {
          my.getPhone(msg, (data) => {
            if (data.code == 200) {
              var data = JSON.parse(data.msg);
              that.setData({
                phoneNumber: data.phoneNumber
              })
            }
          })

        }
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
    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              that.setData({
                userInfo: userInfo
              })
            }
          })
          that.setData({
            isHide: false
          })
        } else {
          that.setData({
            isHide: true
          })
        }
      }
    })
    console.log(that.data.userInfo)
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
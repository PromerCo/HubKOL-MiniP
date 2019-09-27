import { Login } from 'login-model.js';
var login = new Login(); //实例化 首页 对象
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true,
    showDialog: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    //判断是否授权
  },


  bindGetUserInfo:function(e){
    var userInfo = e.detail.rawData  
    login.getUserAhth(userInfo, (data) => {
          var data = JSON.parse(data); 
 
    
          if (data.code == 201){
            let pages = getCurrentPages(); //页面栈
            let currPage = pages[pages.length - 1]; //当前页面
            let prevPage = pages[pages.length - 2]; // 上一个页面
            wx.setStorageSync('userInfo', JSON.parse(userInfo));  //用户信息缓存
            
            prevPage.setData({
              userInfo: JSON.parse(userInfo), // 假数据,
              authHidding:false,
              status:0
            })
            wx.navigateBack({
              delta: 1
            })

          }else{
            wx.showToast({
              title: '授权失败',//提示文字
              duration: 500,//显示时长
              mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false  
              icon: 'none', //图标，支持"success"、"loading"  
            })
          }

    });
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
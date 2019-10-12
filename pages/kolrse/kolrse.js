// pages/kolrse/kolrse.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden:true,
    url: app.globalData.url,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var info = decodeURIComponent(options.info)
    var info_obj = JSON.parse(info)
    console.log(info_obj)
    that.setData({
      list: info_obj
    })
  },

  follow:function(e){
   
  },

 /*
 跳转KOL
 */
  navCategory:function(){
    wx.switchTab({
      url: '/pages/category/category'
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
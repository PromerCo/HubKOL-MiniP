
import { Sign } from 'sign-model.js';

var app = getApp();

var sign = new Sign(); //实例化 首页 对象

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        image: "../../imgs/icon/timg.jpg",
        text: "意大利led化妆镜ins风",
        data: "活动进行中"
      }, {
        image: "../../imgs/icon/timg.jpg",
        text: "意大利led化妆镜ins风",
        data: "活动已截至"
      }
    ],
    url: app.globalData.url
  },
  see() {
    
    wx.navigateTo({
      url: '../../pages/details/details',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this._loadData();

  },

  _loadData: function (callback) {
    var that = this;
    //栏目列表
    sign.getlist((data) =>{
      var data = JSON.parse(data); 
      console.log(data)
      if (data.code == 201){
      that.setData({
        list:data.data
      })
      }
      console.log(data)

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
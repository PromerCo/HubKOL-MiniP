
import { Follow } from 'follow-model.js';
var app = getApp();
var follow = new Follow(); //实例化 首页 对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    right: [
      {
        text: '取消关注',
        style: 'background-color: #F4333C; color: white',
      }],
    list:[],
    // tab切换  
    currentTab: 0,
  },
  // 滑动
  onclick(e) {
    console.log('onClick', e.detail)
    if (e.detail.data) {
      wx.showModal({
        title: `The data is ${e.detail.data}`,
        showCancel: !1,
      })
    }
  },
  nvadatil:function(e){

    var pro_id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: '../../pages/kolrse/kolrse?pro_id=' + pro_id,
    })

  },

  // 选项卡
  swichNav: function (e) {

    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
     
      let type = e.target.dataset.current
      console.log(type)

      that._loadData(type)
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this._loadData()
  },

  _loadData: function (type = 0) {
    var that = this

    follow.follower(type, (data) => {

    console.log(data)

      that.setData({
        list: data.data,

      })
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
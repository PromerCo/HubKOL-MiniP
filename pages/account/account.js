const common = require('../../utils/common.js')
import { Account } from 'account-model.js';

var account = new Account(); //实例化 首页 对象

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      "id": '1',
      "name": "抖音",
      "number": "1456677987",
    },
    {
      "id":'2',
      "name": "快手",
      "number": "916322797",
    },
    ],

    value: '1',
    checked: false,
    choose: false,
  },

  onCheckboxChange(e) {
    console.log(e.detail.value )
    this.setData({
      value: e.detail.value,
    })
  },
  

  onChange(e) {
    console.log(e)

    this.setData({
      value: e.detail.value,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData:function(e){
    var that = this
    account.getlist((data) => {

    var data = JSON.parse(data);

    
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
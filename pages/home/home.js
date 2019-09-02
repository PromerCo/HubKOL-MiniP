import { Home } from 'home-model.js';
var home = new Home(); //实例化 首页 对象
Page({
  data: {
    loadingHidden: false
  },
  onLoad: function () {
    this._loadData();
  },

  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this;

  },

  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },

  //分享效果
  onShareAppMessage: function () {
    return {
      title: '零食商贩 Pretty Vendor',
      path: 'pages/home/home'
    }
  }

})




const repeatclick = require('../../utils/repeatclick.js')

import { Home } from 'home-model.js';
var app = getApp();
var home = new Home(); //实例化 首页 对象
Page({
  data: {
    loadingHidden: false,
    buttonClicked: false,
    roleHidden:false,
    swatch:0,
    actEndTimeList:[],
    list:[],
    start_page:0,
    end_page: 5,
    url: app.globalData.url,
    image_list:[
      { 'id': '100001', 'logo': '../../imgs/icon/platform-100001-0.png' },
      { 'id': '100002', 'logo': '../../imgs/icon/platform-100002-0.png' },
      { 'id': '100003', 'logo': '../../imgs/icon/platform-100003-0.png' },
      { 'id': '100004', 'logo': '../../imgs/icon/platform-100004-0.png' },
      { 'id': '100005', 'logo': '../../imgs/icon/platform-100005-0.png' },
      { 'id': '100006', 'logo': '../../imgs/icon/platform-100006-0.png' },
      { 'id': '100007', 'logo': '../../imgs/icon/platform-100007-0.png' },
    ]
  },

  onLoad: function () {
    var that = this;
    var ploform = wx.getStorageSync('record').ploform;

    if (!ploform) {
      app.onLaunch();//初始化页面数据
    } else {
      ploform.splice(0, 1)
    }
    var start_page = this.data.start_page
    var img = this.data.image_list
    this.setData({
      image_list: ploform
    })
    this._loadData(start_page,1);
  },
  details: throttle(function (e) {
  
   var id = e.currentTarget.dataset.id
   wx.navigateTo({
     url: '../../pages/details/details?push_id=' + id,
   })
  }, 1000),

  publish: throttle(function (e) {
    var that = this
    wx.navigateTo({
      url: '../../pages/release/release',
    })

  }, 1000),

  /*加载所有数据*/
  _loadData: function (start_page,status=0) {
    var  that = this;
    var  msg = [];
    var  end_page = that.data.end_page
    msg['start_page'] = start_page
    
    //获取列表信息(data 回调)
    home.getlist(msg,(data) => {
         var list = data.data; 
      console.log(list)   
         var home_list = that.data.list;
  
         if (status ==0){
           for (var i = 0; i < list.length; i++) {
             home_list.push(list[i])
           }
        }else{
             home_list = list
        }
      console.log(home_list)
 
         wx.stopPullDownRefresh() 
         that.setData({
           list: home_list,
           loadingHidden: true,
           start_page: start_page,
           end_page: end_page
         })
    })
    wx.hideLoading();
  },

  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    var that = this
    var start_page = 0
    this._loadData(start_page,1);
  },
  /*上拉加载更多*/
  onReachBottom: function () {
    var that = this;
    var start_page = that.data.start_page
    var start_page = start_page+5 
    that._loadData(start_page);
  },

  onShow:function(){
    var that = this

    var swatch = that.data.swatc

    if (swatch == 0){
      that.onPullDownRefresh()
    }


    /*
    获取角色状态
    */
    home.roleStatus((data) => {

      if (data.code == 419){
        that.setData({
          roleHidden: false,
        })
      }else{
        var result = JSON.parse(data);
        var status = result.data
        if (status == 1) {
          that.setData({
            roleHidden: true,
          })
        } else {
          that.setData({
            roleHidden: false,
          })
        }
      }


    })
  },
  onReady: function () {
    console.log(12)
  }, 



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

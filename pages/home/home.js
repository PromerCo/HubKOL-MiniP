const common = require('../../utils/common.js')

import { Home } from 'home-model.js';

var home = new Home(); //实例化 首页 对象
Page({
  data: {
    loadingHidden: false,
    buttonClicked: false,
    actEndTimeList:[],
    list:[],
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
    //页面初始化时候
    this._loadData();
  },
  details: throttle(function (e) {
   var info = e.currentTarget.dataset.info
   console.log(info)
   var info_str = JSON.stringify(info)
   wx.navigateTo({
     url: '../../pages/details/details?info=' + info_str,
   })

  }, 1000),
  publish: throttle(function (e) {
    var that = this
    wx.navigateTo({
      url: '../../pages/release/release',
    })
    return false;
    home.roleStatus((data) => {
    var data = JSON.parse(data); 
      if (data.data == 0) {
        //跳转到授权页面
        wx.navigateTo({
          url: '../../pages/my/my',
        })
      } else if (data.data == 1) {
        //跳转发布页面
        wx.navigateTo({
          url: '../../pages/release/release',
        })
      } else {
        //提示没有KOL权限
        wx.showToast({
          title: '没有HUB权限！',
          icon: 'none',
          duration: 800,
          mask: true,
        })
      }
    })
  }, 1000),


  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this;
    //获取列表信息(data 回调)
    home.getlist((data) => {   
         var list = data.data; 
         console.log(list) 
         that.setData({
           loadingHidden:true,
           list: list
         })
    })

  },

  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },

  /*
     倒计时函数
  */

  timeFormat:function(param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },

  countDown:function(){
    var that = this
    //获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList = that.data.list;
    let countDownArr = [];
    //对结束时间进行处理渲染到页面
    endTimeList.forEach(function (o, index, arrSelf) {
      let arr = o['expire_time'].split(/[- :]/);
      let nndate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
      nndate = Date.parse(nndate)
      let endTime = nndate;
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);

        o['countdown'] = day + ' 天 ' + hou + ' 小时 ' + min + ' 分 ' + sec + '秒'
 
      } else { //活动已结束，全部设置为'00'
        o['countdown'] = "活动已经截至"
      }
      countDownArr.push(o);
    })


    this.setData({
      list: countDownArr
    })
    setTimeout(this.countDown, 1000);

  },
  

  onShow:function(){


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


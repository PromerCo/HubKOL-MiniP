import { Home } from 'home-model.js';
var home = new Home(); //实例化 首页 对象
Page({
  data: {
    loadingHidden: false,
    actions: [{
      type: 'default',
      text: '微信支付',
    }, {
      text: '现金支付',
      type: 'primary',
    }],
    list:[{
      image:"../../imgs/icon/girl.png",
      title:"我是一段标题",
      smalltitle:"我是一段内容",
      time:"2017-01-02",
      category:"抖音/快手"
    }, {
        image: "../../imgs/icon/girl.png",
        title: "我是一段标题",
        smalltitle: "我是一段内容",
        time: "2017-01-02",
        category: "抖音/快手"
      }
      , {
        image: "../../imgs/icon/girl.png",
        title: "我是一段标题",
        smalltitle: "我是一段内容",
        time: "2017-01-02",
        category: "抖音/快手"
      }
      , {
        image: "../../imgs/icon/girl.png",
        title: "我是一段标题",
        smalltitle: "我是一段内容",
        time: "2017-01-02",
        category: "抖音/快手"
      }
      , {
        image: "../../imgs/icon/girl.png",
        title: "我是一段标题",
        smalltitle: "我是一段内容",
        time: "2017-01-02",
        category: "抖音/快手"
      }
      , {
        image: "../../imgs/icon/girl.png",
        title: "我是一段标题",
        smalltitle: "我是一段内容",
        time: "2017-01-02",
        category: "抖音/快手"
      }]
  },
  onLoad: function () {
    this._loadData();
  },
  xiangqing(){
   wx.navigateTo({
     url: '../../pages/details/details',
   })
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



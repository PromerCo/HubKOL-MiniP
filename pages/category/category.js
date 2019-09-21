var app = getApp();
import { Category } from 'category-model.js';
var category = new Category(); //实例化 首页 对象

Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    tex:['1','2','3'],
    list:[
         { "id": 1 }, { "id": 2 }, { "id": 3 }, { "id": 4 }, { "id": 5 }, { "id": 6 }, { "id": 7 }
    ],
    sa: [{ "name": "小姐姐", "logo": "" }, { "name": "小哥哥", "logo": "" }, { "name": "明星", "logo": "" }, { "name": "萌娃", "logo": "" }, { "name": "时尚", "logo": "" }, { "name": "美妆", "logo": "" }, { "name": "科技", "logo": "" }, { "name": "情感", "logo": "" }, { "name": "创意", "logo": "" }],
    loadingHidden:false,
    column:[],
    column_list: [],
    platform_id:100001,
    avtivity_list:[],
    hiddenName: true,
    url: app.globalData.url,
    index:0,
    hidden:false

  },
  onLoad: function (options) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
        clientWidth = res.windowWidth,
        rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    });
    that._loadData();

  },




  // 点击切换
  onTabsChange:function(e) {
    const { index } = e.detail
    // 当前项
    const item = this.data.column[index]
    const platform_id = item.id
    var msg = [];
    msg.platform_id = platform_id
    console.log(msg.platform_id)

    if (msg.platform_id == 100000){
      msg.type = 0
    }else{
      msg.type = 1
    }
    this.setData({
      loadingHidden:false
    })

    category.getList(msg, (data) => {
      this.setData({
        avtivity_list: data.data,
        loadingHidden: true
      })
    });

  },

  /*
  跳转kol
  */
  kol_details:function(e){
    var that = this
    var info = e.currentTarget.dataset.info
    var info_str = JSON.stringify(info)


    wx.navigateTo({
      url: '../../pages/kolrse/kolrse?info=' + info_str,
    })
  },

  changeTab:function(e){
   console.log(e)
  },

  _loadData: function (callback) {
    var that = this;
    //页面数据
    var msg = [];
    msg.type = 0;
    category.getList(msg, (data) => {
      if (data.code == 201) {
        console.log(data.data)
        that.setData({
          avtivity_list: data.data,
          loadingHidden:true
        })
      }
    });
    //栏目数据
    category.column((data) => {

      that.setData({
              column:data.data,
              column_list: data.data[0]['retion']
      })
    });

  },

  search_check:function(e){

    that.setData({
      hidden: hidden
    })

  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var that = this;
    var list = that.data.column;
    var cur = e.target.dataset.current;
    var platform_id = e.currentTarget.dataset.column;   //栏目ID
    if (this.data.currentTaB == cur) {
             return false;
    }


    else {
      this.setData({
        currentTab: cur,
        platform_id: platform_id,
        column_list: list[cur]['retion'],
      })
    }
  },

  pulldata:function(e){
    var that = this;
    var tag_id = e.currentTarget.dataset.tag
    var platform_id = that.data.platform_id
 
    var msg = [];
    msg.tages_id = tag_id
    msg.platform_id = platform_id
    msg.type = 1
    category.getList(msg, (data) => {
   
      if (data.code == 201){
         console.log(data.data)  
         that.setData({
           avtivity_list: data.data
         })
      }
    })
    

  },



  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  click: function (e) {
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },

  footerTap: app.footerTap
})
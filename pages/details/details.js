var app = getApp();
import { Detalis } from 'details-model.js';
var details = new Detalis(); //实例化 首页 对象

let animationShowHeight = 300;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    info:[],
    shareImgSrc: '',// 画布转成图片的临时地
    loadingHidden: false,
    is_enroll:0,
    url: app.globalData.url

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var info = JSON.parse(options.info); 
    var enroll = JSON.parse(info['enroll']);
    if (enroll != null || enroll!=undefined){
      var items = JSON.parse(enroll)
    }else{
      var  items = [];
    }

    that.setData({
      info: info,
      items: items,
      loadingHidden: true,
      is_enroll: info['is_enroll']
    })

    that._loadData();
  },

  _loadData:function(){
    var that = this;
    var push_id = that.data.info.id;

    //记录浏览量
    details.showAgree(push_id,(data) => {
      var info = JSON.parse(data); 
      console.log(info)

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
   * 保存到相册
   */
  saveShareImg: function () {
    let that = this;
    console.log(that.data.shareImgSrc);
    setTimeout(function () {
      wx.saveImageToPhotosAlbum({
        filePath: that.data.shareImgSrc,
        success: function (res) {
        },
        fail: function (error) {
          console.log(error.errMsg);
          wx.showModal({
            title: '提示',
            content: '请允许保存图片到相册',
          });
        },
      });
    }, 500);
  },

  agree:function(e){

    var that = this
    var image_list = that.data.items

    var push_id = that.data.info.id

    details.agree(push_id,(data) => {
      var result  = JSON.parse(data); 

      if (result.code == 201){
        //报名成功
        var img = { 'avatar_url': result.data };

        image_list.push(img)

        that.setData({
          is_enroll: 1,
          items: image_list
        })
      } else if (result.code == 200){
          wx.showToast({
            title: '您已经报名',
            icon: 'none',
            duration: 1000,
            mask: true,
          })
      }else{

        //错误信息 
          wx.showToast({
            title: result.msg,
            icon: 'none',
            duration: 1000,
            mask: true,
          })
      }
      

    })


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

  //分享效果
  onShareAppMessage: function () {
  
    var info = this.data.info
    var parameter = JSON.parse(info); 

    return {
      title: '拍卖口红',
      path: 'pages/details/details?info=' + parameter
    }
  }


})
import { My } from 'my-model.js';
import { citys } from '../../utils/city.js';
var my = new My();
var app = getApp();

Page({
  data: {
    index: 0,
    temp: [],
    showList:false,
    picker_01_index:0,
    isShow_01: false,
    hasUserInfo: false,
    showDialog: false,
    phoneNumber:'',
    userInfo:[],
    isHide: false,
    multiIndex: [0, 0],
    label:true,
    presentation:'正在加载....',
    column_title : '我发布的栏目',
    listData_01: [
      ['HUB', 'KOL']
    ],
    isShow_03: false,
    multiArray: [
      ['广告', '传媒', '市场', '运营'],
      ['媒体投放', '品牌公关', '媒介经理']

    ],
    userInfo: [],
    isShow_08: false,
    defaultPickData_08: [{
      code: '500000'   
    }, {
      code: '500200'   
    }, {
      code: '500243'   
    }],
    listData_08: citys,
    picker_08_data: [],
    loadingHidden: false,
    isShow_09: false,
    defaultPickData_09: [{
      code: '500000'
    }, {
      code: '500200'
    }, {
      code: '500243'
    }],
    listData_09: citys,
    picker_09_data: [],
    isShow_02: false,
    listData_02: [
      ['抖音达人', '快手达人', '哔哩达人', '美拍达人', '秒拍达人',
        '火山达人', '西瓜达人'
      ]
    ],
    picker_02_data: ['抖音达人'],
    isShow_03: false,
    listData_03: [['1万以下', '1万-5万', '6万-10万', '11万-20万', '21万-50万', '51万-1百万', '1百万-2百万', '2百万-5百万', '5百万-1千万','1千万以上']],
    picker_03_data: ['1万以下'],
    message:[],
    counter_mark:'HUB'
  },
  showPicker_01: function(e) {
    this.setData({
      isShow_01: true
    })
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['市场推广', '产品推广', '新媒体推广'];
            break;
          case 1:
            data.multiArray[1] = ['电商传媒', '活动传媒', '网络传媒'];
            break;
          case 2:
            data.multiArray[1] = ['活动市场', '产品市场', '销售市场'];
            break;
          case 3:
            data.multiArray[1] = ['活动运营', '电商运营', '新媒体运营'];
            break;
        }
    }
    this.setData(data);
  },
  sureCallBack_01(e) {

    var that = this
    that.setData({
      loadingHidden:false,
      presentation: '正在切换'
    })

    let data = e.detail
    let type = data.choosedIndexArr[0]
    my.blockedOut(type, (data) => {
      var data = JSON.parse(data); 

      if (data.code == 201){
        wx.setStorageSync('HubKol', data.data);
        if (data.data.type == 1) {
          var type = 0
          var counter_mark = 'HUB'
          var column_title = '我发布的栏目'
        } else {
          var type = 1
          var counter_mark = 'KOL'
          var column_title = '我报名的栏目'
        }
        that.setData({
          isShow_01: false,
          counter_mark: e.detail.choosedData,
          picker_01_index: type,
          message: data.data,
          loadingHidden:true
        })

      }
    })
  },


  cancleCallBack_01(e) {
    this.setData({
      isShow_01: false,
    })
  },

  showPicker_03: function() {
    this.setData({
      isShow_03: true
    })
  },
  
  sureCallBack_03(e) {
    let data = e.detail
    this.setData({
      isShow_03: false,
      picker_03_data: e.detail.choosedData,
      picker_03_index: JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_03() {
    this.setData({
      isShow_03: false,
    })
  },

  showPicker_08: function() {
    this.setData({
      isShow_08: true
    })
  },

  sureCallBack_08(e) {
    this.setData({
      isShow_08: false,
      picker_08_data: e.detail.choosedData,
      picker_08_index: JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_08() {
    this.setData({
      isShow_08: false,
    })
  },

  showPicker_09: function() {
    this.setData({
      isShow_09: true
    })
  },
  sureCallBack_09(e) {
    console.log(JSON.stringify(e.detail.choosedIndexArr))
    this.setData({
      isShow_09: false,
      picker_09_data: e.detail.choosedData,
      picker_09_index: JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_09() {
    this.setData({
      isShow_08: false,
    })
  },

  showPicker_02: function(e) {
    this.setData({
      isShow_02: true
    })
  },
  sureCallBack_02(e) {
    let data = e.detail
    console.log(JSON.stringify(e.detail.choosedIndexArr))
    this.setData({
      isShow_02: false,
      picker_02_data: e.detail.choosedData,
      picker_02_index: JSON.stringify(e.detail.choosedIndexArr),

    })
  },

  cancleCallBack_02(e) {
    this.setData({
      isShow_02: false,
    })
  },

    getPhoneNumber:function(e){
    var that = this
    //获取用户手机号
    var errMsg = e.detail.errMsg
    var msg    = e.detail
    wx.login({
      success: function (res) {
        msg.code = res.code
        if (errMsg == 'getPhoneNumber:ok') {
          my.getPhone(msg, (data) => {
            var data = JSON.parse(data);
            console.log(data)
            if (data.code == 201) {
              var data = JSON.parse(data.msg);
              that.setData({
                phoneNumber: data.phoneNumber
              })
            }
          })
        }
      }
    })
  },

  // 我的账号
  account() {
    wx.navigateTo({
      url: '../../pages/account/account',
    })
  },
  // 我报名的栏目
  sign() {
    wx.navigateTo({
      url: '../../pages/sign/sign',
    })
  },

  //关注的达人
  follow:function(e){
    console.log('关注达人')
  }, 
  //商务通讯录
  service:function(e){
     console.log('通讯录')
  },
  formSubmit:function(e){
    // showLoading('正在保存'); 

    var that = this
    var type = that.data.picker_01_index //类型 
    var msg = e.detail.value   //根据类型 判断

    var phone = msg['phone']

    var wx_name = msg['wx_name']

    var email = msg['email']

   
    if (phone == undefined || phone == '') {
      wx.showToast({
        title: "手机号不能为空",
        icon: 'none',
        duration: 1200,
        mask: true
      });
      return false;
    } 
    if (wx_name == undefined || wx_name == '') {
      wx.showToast({
        title: "微信号不能为空",
        icon: 'none',
        duration: 1200,
        mask: true
      });
      return false;
    }
    console.log(123)
    if (email == undefined || email == '') {
      wx.showToast({
        title: "邮箱不能为空",
        icon: 'none',
        duration: 1200,
        mask: true
      });
      return false;
    }

    if (type == 0){
      msg.type = 1;
      my.saveData(msg, (data) => {
        var data = JSON.parse(data); 
        if (data.code == 200) {
         //保存成功
          that.setData({
            showList: true,
            counter_mark: 'HUB',
          })
         hideLoading();  
        }else{
          wx.showToast({
            title:'请完善资料！',
            icon:'none',
            duration:1000,
            mask: true,
          })
          hideLoading();
        }
      })
    }else{
      msg.type = 2;
      msg.city = e.detail.value.kol_city   
      msg.province = e.detail.value.kol_province   
      msg.city_code = e.detail.value.kol_city_code 
      msg.province_code = e.detail.value.kol_province_code     
      my.saveData(msg, (data) => {
      var data = JSON.parse(data); 
      if (data.code == 200) {
          //保存成功
          that.setData({
            showList: true,
            counter_mark: 'KOL',
          })
          hideLoading();
        }else{
          wx.showToast({
            title: '请完善资料！',
            icon: 'none',
            duration: 1200,
            mask: true,
          })
          hideLoading();
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      var that = this
      that._loadData();

  },
  edit_data:function(e){
    var that  = this;
    that.setData({
      showList: false,
    })

  },
  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this
    let message = wx.getStorageSync('HubKol');
    console.log(message)

    if (message == '' || message == null || message == undefined){
      my.roleStatus((data) => {
        var data = JSON.parse(data); 
        if (data.code == 201) {
          wx.setStorageSync('HubKol', data.data);
          if (data.data.type == 1) {
            var type = 0
            var counter_mark = 'HUB'
            var column_title = '我发布的栏目'
          } else {
            var type = 1
            var counter_mark = 'KOL'
            var column_title = '我报名的栏目'
          }

          //已填写资料
          that.setData({
            showList: true,
            picker_01_index: type,
            message: data.data,
            label: false,
            counter_mark: counter_mark,
          })
        }
      })
    }else{

      if (message.type == 1){
          var  type = 0
          var counter_mark = 'HUB'
          var column_title = '我发布的栏目'
      }else{
          var  type = 1
          var counter_mark = 'KOL'
          var column_title = '我报名的栏目'
      }

      that.setData({
        showList: true,
        label: false,
        message: message,
        counter_mark: counter_mark,
        picker_01_index: type,
        column_title: column_title
      })
    }
  },


  click_label:function(e){
    wx.showToast({
      title: "无法修改,请联系客服",
      icon: 'none',
      mask: true,
      duration: 800
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
   onShow: function () {
    var that = this
  
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              console.log(userInfo)
              that.setData({
                userInfo: userInfo,
                isHide:false,
                loadingHidden:true,
                showDialog:true
              })
            }
          })
        } else {
          that.setData({
            isHide: true,
            loadingHidden: true
          })
        }
      }
    })
  
  },

  setDisabled:function(){
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
        } else {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})


function showLoading(message) {
  if (wx.showLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.showLoading({
      title: message,
      mask: true
    });
  } else {
    // 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
    wx.showToast({
      title: message,
      icon: 'loading',
      mask: true,
      duration: 20000
    });
  }
}

function hideLoading() {
  if (wx.hideLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.hideLoading();
  } else {
    wx.hideToast();
  }
}